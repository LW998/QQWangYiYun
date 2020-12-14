<template>
  <main class="searchBody">
    <section class="search" :class="{ active: SearchActive }">
      <div class="searchBox">
        <svg class="searchIcon">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#icon_search"
          >
            <svg id="icon_search" viewBox="0 0 32 32">
              <title>搜索</title>
              <path
                d="M28.049 29.5l-4.753-4.753c-4.73 3.994-11.813 3.762-16.27-0.695-4.701-4.701-4.701-12.324 0-17.026s12.324-4.701 17.026 0c4.457 4.457 4.689 11.54 0.695 16.27l4.753 4.753-1.451 1.451zM22.571 8.429c-3.905-3.905-10.237-3.905-14.142 0s-3.905 10.237 0 14.142c3.905 3.905 10.237 3.905 14.142 0s3.905-10.237 0-14.142z"
              ></path>
            </svg>
          </use>
        </svg>
        <input
          type="search"
          v-model="SearchText"
          class="searchInp"
          placeholder="搜索"
          @click="searchClick"
          @keyup.enter="toSearch"
        />
        <i class="clear" v-show="clearShow" @click="clearText">×</i>
      </div>
      <span class="cancel" v-show="SearchActive" @click="cancelSearch"
        >取消</span
      >
    </section>

    <section class="SearchCont" v-show="SearchActive">
      <div v-show="resultList.length === 0">
        <section class="SearchText" v-show="historyList.length !== 0">
          <h2 class="title">
            历史搜索
          </h2>
          <div class="hotList">
            <a
              href="javascript:;"
              v-for="(item, index) in historyList"
              :key="index"
              class="hotItem"
              @click="labelClick(item)"
              >{{ item }}</a
            >
          </div>
          <div class="historydel" @click="clearHistory">
            <svg class="delIcon c_txt2">
              <use xlink:href="#icon_delete">
                <svg id="icon_delete" viewBox="0 0 32 32">
                  <title>删除</title>
                  <path
                    d="M25 10.5h2v13.996c0 2.753-2.141 5.004-4.809 5.004h-12.382c-2.667 0-4.809-2.253-4.809-5.004v-13.996h2v13.996c0 1.669 1.27 3.004 2.809 3.004h12.382c1.54 0 2.809-1.334 2.809-3.004v-13.996zM3 8.5v-2h26v2h-26zM18 10.5h2v14h-2v-14zM12 10.5h2v14h-2v-14zM12 5.785v0.715h-2v-0.715c0-1.807 1.436-3.285 3.219-3.285h5.561c1.784 0 3.219 1.478 3.219 3.285v0.715h-2v-0.715c0-0.715-0.553-1.285-1.219-1.285h-5.561c-0.666 0-1.219 0.57-1.219 1.285z"
                  ></path>
                </svg>
              </use>
            </svg>
          </div>
        </section>
        <section class="SearchText">
          <h2 class="title">
            热门搜索
          </h2>
          <div class="hotList">
            <a
              href="javascript:;"
              v-for="(item, index) in hotList"
              :key="index"
              class="hotItem"
              @click="labelClick(item.k)"
              >{{ item.k }}</a
            >
          </div>
        </section>
      </div>
      <!-- 搜索返回结果 -->
      <section class="SearchResult" v-show="resultList.length !== 0">
        <ul class="resList">
          <li class="ListItem" v-for="(item, index) in resultList" :key="index">
            <div
              class="listItemBox"
              @click="playClick(item.songmid, item.songname, item.singer)"
            >
              <h3 class="itemSong">{{ item.songname }}</h3>
              <p>
                <span
                  class="itemSinger"
                  v-for="(singer, i) in item.singer"
                  :key="i"
                  >{{ singer }}</span
                >
              </p>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <backTop class="backTopBtn" v-show="showBack"></backTop>
  </main>
</template>

<script>
import { debounce } from '../../../../../common/utils'
import { getHot, getSearch, SearchRes, getSongUrl } from '../RecommendReq'
export default {
  name: 'Search',
  data() {
    return {
      SearchActive: false,
      SearchText: '',
      hotList: [],
      historyList: [],
      pageNo: 1,
      resultList: [],
      showBack: false,
      // 是否还有更多
      more: true,
      getList: null,
    }
  },
  // props: {
  //   bottomTop: {
  //     type: Number,
  //   },
  // },
  mounted() {
    this.getList = debounce(this.getData, 17)
  },
  methods: {
    // 点击搜索框
    searchClick() {
      this.SearchActive = true
      this.$emit('changeActive', true)
    },
    // 取消按钮
    cancelSearch() {
      this.SearchActive = false
      this.$emit('changeActive', false)
      this.SearchText = ''
      this.resultList = []
      this.pageNo = 1
      window.onscroll = null
    },
    //供外界调用关闭搜索框的方法
    pageLeave() {
      this.SearchActive = false
      this.SearchText = ''
      this.resultList = []
      this.pageNo = 1
    },
    // 点击X号
    clearText() {
      this.SearchText = ''
      this.pageNo = 1
      this.more = true
      this.resultList = []
      window.onscroll = null
    },
    // 回车搜索
    toSearch() {
      this.SearchData()
    },
    // 点击标签搜索
    labelClick(name) {
      this.SearchText = name
      this.SearchData()
    },
    // 搜索的方法
    SearchData() {
      //判断是否添加搜索历史
      if (!this.historyList.some((item) => item === this.SearchText)) {
        this.historyList.unshift(this.SearchText)
        window.localStorage.setItem('history', JSON.stringify(this.historyList))
      }
      //判断是否进行搜索请求发送
      if (this.SearchText.trim().length !== 0) {
        this.getData()
        window.onscroll = debounce(this.handleScroll, 17)
        // window.addEventListener("scroll", debounce(this.handleScroll, 50));
      } else {
        this.$tip.show('请输入搜索关键字', 'warning')
      }
    },
    // 监听页面滚动处理
    handleScroll() {
      // 获取滚动高度
      let scrollT =
          document.documentElement.scrollTop || document.body.scrollTop,
        // 窗口高度
        winH =
          document.documentElement.clientHeight || document.body.clientHeight,
        // 已经滚去的高度
        scrollH =
          document.documentElement.scrollHeight || document.body.scrollHeight
      //是否滚动到底部的判断
      if (scrollT + winH >= scrollH - 50) {
        if (this.more) {
          this.pageNo += 1
          this.getList()
        }
      }
      if (scrollT > winH * 3.5) {
        this.showBack = true
      } else if (scrollT === 0 || scrollT < winH * 3.5) {
        this.showBack = false
      }
      // this.$emit("getTop");
      // console.log(this.bottomTop);
    },
    // 清空搜索历史
    clearHistory() {
      window.localStorage.removeItem('history')
      this.historyList = []
    },
    // 获取数据
    getData() {
      getSearch({ key: this.SearchText, pageNo: this.pageNo }).then((res) => {
        if (res.result === 100) {
          this.resultList = []
          this.more = res.data.more
          res.data.list.forEach((item) => {
            this.resultList.push(new SearchRes(item))
          })
        }
      })
    },
    // 搜索播放
    playClick(id, name, singer) {
      // name = encodeURIComponent(name);
      // singer = encodeURIComponent(
      //   singer.filter((item) => item !== ".").join("/")
      // );
      // this.$route.path !== `/player/${id}/${name}/${singer}`
      //   ? this.$router.push(`/player/${id}/${name}/${singer}`)
      //   : null;
      singer = singer.filter((item) => item !== '.').join('/')
      let result = []
      getSongUrl({ id }).then((res) => {
        if (res.result === 100) {
          let obj = {
            songmid: id,
            songname: name,
            singer,
            playUrl: res.data[id],
          }
          result[0] = obj
          window.sessionStorage.setItem('playList', JSON.stringify(result))
          this.$route.path !== '/player' ? this.$router.push('/player') : null
        } else {
          this.$tip.show(res.errMsg, 'error')
        }
      })
    },
  },
  computed: {
    clearShow() {
      return this.SearchText.trim().length !== 0
    },
  },
  created() {
    if (window.localStorage.getItem('history')) {
      this.historyList = JSON.parse(window.localStorage.getItem('history'))
    }
    getHot().then((res) => {
      if (res.result === 100) {
        this.hotList = res.data
      }
    })
  },
}
</script>

<style lang="less" scoped>
.searchBody {
  user-select: none;
  margin-bottom: 0.2rem;
  .search {
    display: -webkit-box;
    .searchBox {
      position: relative;
      -webkit-box-flex: 1;
      height: 0.5rem;
      margin: 0 0.3rem;
      overflow: hidden;
      border-radius: 0.5rem;
      background-color: #fff;
      .searchIcon {
        position: absolute;
        top: 0.1rem;
        left: 53%;
        width: 0.3rem;
        height: 0.3rem;
        margin-left: -0.8rem;
        fill: currentColor;
        color: rgba(26, 26, 26, 0.5);
      }
      .searchInp {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding-top: 0.12rem;
        padding-bottom: 0.08rem;
        padding-left: 0.2rem;
        font-size: 0.24rem;
        text-align: center;
        border: none;
        outline: none;
        border-radius: 0;
        background: 0 0;
        -webkit-appearance: none;
      }
      .clear {
        position: absolute;
        top: 50%;
        right: -0.15rem;
        text-align: center;
        width: 0.8rem;
        font-size: 0.4rem;
        transform: translateY(-55%);
        overflow: hidden;
      }
    }
    .cancel {
      height: 0.5rem;
      padding: 0 0.2rem;
      line-height: 0.5rem;
      font-weight: 700;
      font-size: 0.24rem;
    }
  }
  .active {
    display: -webkit-box;
    .searchBox {
      margin-right: 0;
      .searchIcon {
        left: 0.1rem;
        margin-left: 0;
      }
      .searchInp {
        text-align: left;
        padding-left: 0.48rem;
        padding-right: 0.4rem;
      }
    }
  }
  .SearchCont {
    padding: 0.2rem 0.3rem;
    position: relative;
    .SearchText {
      .title {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .hotList {
        display: flex;
        flex-wrap: wrap;
        .hotItem {
          height: 0.4rem;
          line-height: 0.4rem;
          margin: 0.06rem 0.18rem 0.06rem 0rem;
          background-color: #fff;
          border-radius: 0.2rem;
          padding: 0 0.2rem;
        }
      }
      .historydel {
        position: absolute;
        top: 0.22rem;
        right: 0.3rem;
        width: 0.6rem;
        height: 0.6rem;
        .delIcon {
          display: block;
          width: 0.3rem;
          height: 0.3rem;
          margin: 0.12rem;
          color: #1a1a1a80;
          fill: currentColor;
        }
      }
    }
    .SearchResult {
      .resList {
        width: 100%;
        .ListItem {
          margin: 0.1rem 0;
          height: 0.9rem;
          .listItemBox {
            width: 100%;
            height: 100%;
            // background: chartreuse;
            .itemSong {
              font-size: 0.28rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 0.45rem;
              line-height: 0.45rem;
            }
            .itemSinger {
              margin-top: 0.1rem;
              height: 0.35rem;
              line-height: 0.35rem;
              font-size: 0.21rem;
              color: #1a1a1a80;
            }
          }
        }
      }
    }
  }
}
</style>
