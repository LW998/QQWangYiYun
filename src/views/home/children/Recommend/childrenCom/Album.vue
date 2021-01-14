<template>
  <section class="recommendBox">
    <h2 class="title">热门歌单</h2>
    <section class="recommendList">
      <div class="recommendItem"
           v-for="(item, index) in recomList"
           :key="index"
           @click="toDetail(item.id)">
        <img :src="item.imgurl"
             alt=""
             class="recommendImg" />
        <div class="listenBox">
          <p class="num">
            <i class="iconfont icon-shiting"></i><span>{{ item.listennum }}</span>
          </p>
          <p class="play"><i class="iconfont icon-bofang1"></i></p>
        </div>
        <div class="recommendDesc">
          <p class="text">{{ item.dissname }}</p>
          <!-- <p class="date">{{ item.createtime }}</p> -->
        </div>
      </div>
    </section>
    <loading :showLoad='showLoad'></loading>
    <backTop class="backTopBtn"
             v-show="showBack"></backTop>
  </section>
</template>

<script>
import { debounce } from '../../../../../common/utils'
import { getAlbum } from '../RecommendReq'

import loading from '../../../../../components/comment/loading'
export default {
  name: 'Album',
  data () {
    return {
      // 当前页码
      pageNo: 1,
      // 歌单列表
      recomList: [],
      // 防抖的获取列表
      debounceGet: null,
      //是否显示返回
      showBack: false,
      // 是否显示加载更多
      showLoad: false
    }
  },
  props: {
    activeType: {
      type: Boolean,
    },
  },
  created () {
    this.$emit('showLoading', true)
    this.getRec()
  },
  mounted () {
    this.debounceGet = debounce(this.getRec, 50)
  },
  watch: {
    activeType: {
      // 根据是否显示搜索框，添加scroll事件监听
      handler (newVal, oldVal) {
        if (!newVal) {
          window.onscroll = debounce(this.handlerScroll, 50)
        } else {
          window.onscroll = null
        }
      },
      immediate: true,
    },
  },
  components: {
    loading
  },
  methods: {
    //   获取数据
    getRec () {
      getAlbum({
        pageNo: this.pageNo,
      }).then((res) => {
        if (res.result === 100) {
          res.data.list.forEach((item) => {
            let obj = {}
            obj.id = item.dissid
            obj.dissname = item.dissname
            obj.imgurl = item.imgurl
            obj.listennum =
              item.listennum < 10000
                ? `${item.listennum}`
                : `${(item.listennum / 10000).toFixed(1)}万`
            this.recomList.push(obj)
          })
          this.showLoad = false
        }
        this.$emit('showLoading', false)
      })
    },
    // 监听页面滚动事件
    handlerScroll () {
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
      if (scrollT + winH >= scrollH - 50 && this.$route.path === '/recommend' && !this.showLoad) {
        this.showLoad = true
        this.pageNo += 1
        this.debounceGet()
      }
      if (scrollT > winH * 3.5) {
        this.showBack = true
      } else if (scrollT === 0 || scrollT < winH * 3.5) {
        this.showBack = false
      }
    },
    // 点击歌单跳详情
    toDetail (id) {
      this.$route.path !== '/recdetail/' + id
        ? this.$router.push('/recdetail/' + id)
        : null
    },
  },
}
</script>

<style lang="less" scoped>
.recommendBox {
  user-select: none;
  padding: 0 0.2rem;
  .title {
    font-size: 0.3rem;
    font-weight: bold;
  }
  .recommendList {
    display: flex;
    // width: 6rem;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    .recommendItem {
      width: 2.9rem;
      width: 47.5%;
      position: relative;
      background-color: #fff;
      margin: 0.1rem 0;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      .recommendImg {
        width: 100%;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
      }
      .listenBox {
        display: flex;
        color: #fff;
        position: absolute;
        bottom: 0.8rem;
        left: 0;
        padding: 0.05rem 0.1rem;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: flex-end;
        .num {
          background: rgba(0, 0, 0, 0.4);
          vertical-align: middle;
          height: 0.3rem;
          line-height: 0.3rem;
          padding: 0.01rem 0.1rem;
          border-radius: 0.15rem;
          font-size: 0.18rem;
          .icon-shiting {
            font-size: 0.18rem;
            margin-right: 0.1rem;
          }
        }
        .play {
          .icon-bofang1 {
            font-size: 0.33rem;
          }
        }
      }
      .recommendDesc {
        padding: 0.1rem;
        .text {
          font-size: 0.24rem;
          line-height: 0.3rem;
          text-overflow: ellipsis;
          white-space: pre-wrap;
        }
      }
    }
  }
}
</style>
