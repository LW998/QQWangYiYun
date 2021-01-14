<template>
  <!-- <div v-if="recDetailList.length !==0"> -->
  <main class="recDetail">
    <back></back>
    <section class="Listinfo">
      <div class="imgBox">
        <img :src="recDetailList.logo" alt="" class="topImg" />
      </div>
      <div class="info">
        <h2 class="songName">{{ recDetailList.dissname }}</h2>
        <p class="nick">
          <img :src="recDetailList.head" alt="" class="nickImg" />
          {{ recDetailList.nick }}
        </p>
        <p class="play">播放量: {{ recDetailList.visitnum | toFixed }}</p>
      </div>
      <a href="javascript:;" class="playBtn" @click="playAll">
        <svg class="icon_svg">
          <use xlink:href="#icon_arr">
            <svg id="icon_arr" viewBox="0 0 32 32">
              <title>圆角三角形</title>
              <path
                d="M29.4,17.6c-0.3,0.4-0.6,0.8-1.1,1L6.7,31.6c-1.4,0.9-3.4,0.4-4.2-1C2.2,30,2,29.5,2,28.9V3.1C2,1.4,3.4,0,5.1,0
	c0.6,0,1.2,0.2,1.7,0.4l21.6,12.9C29.8,14.2,30.3,16.1,29.4,17.6z"
              ></path>
            </svg>
          </use>
        </svg>
      </a>
    </section>
    <section class="songListBox">
      <div class="songNum">
        歌单<span class="totalNum">共{{ recDetailList.songnum }}首</span>
      </div>
      <ul class="songList">
        <li
          class="songListItem"
          v-for="(item, index) in recDetailList.list"
          :key="index"
        >
          <div
            class="itemBox"
            @click="playSong(item.songmid, item.songname, item.singer)"
          >
            <h3 class="itemName">
              <span class="name">{{ item.songname }}</span>
            </h3>
            <p class="singerName">
              <img
                src="//y.gtimg.cn/mediastyle/mobile/app/share/img/icon_vip.png"
                alt=""
                class="vip"
                v-show="item.vip"
              />
              {{ item.singer }} · {{ item.album }}
            </p>
          </div>
          <a
            href="javascript:;"
            class="down"
            @click="downSong(item.songmid, item.songname, item.singer)"
            ><i class="iconfont icon-download"></i
          ></a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { getRecDetail, DownSong, getSongUrl, getSongUrls } from './recReq'
import { FirstDebounce } from '../../common/utils'
export default {
  name: 'recDetail',
  data() {
    return {
      id: null,
      recDetailList: [],
      
      detailList: [],
      reqList: [],
      // allPlay: null,
    }
  },
  created() {
    this.$emit('homeLoading', true)
    this.id = this.$route.params.id
    getRecDetail({
      id: this.id,
    }).then((res) => {
      if (res.result === 100) {
        this.recDetailList = res.data
        this.detailList = JSON.parse(JSON.stringify(this.recDetailList.list))
      }
      this.$emit('homeLoading', false)
    })
    // this.allPlay = FirstDebounce(this.playAll, 1000)
  },
  beforeRouteLeave(to, from, next) {
    // if (to.matched[0].path === "/player/:id/:name/:singer") {
    //   this.scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    // }
    this.$emit('homeLoading', false)
    next()
  },
  methods: {
    playSong(id, name, singer) {
      // name = encodeURIComponent(name);
      // singer = encodeURIComponent(singer);
      // this.$route.path !== `/player/${id}/${name}/${singer}`
      //   ? this.$router.push(`/player/${id}/${name}/${singer}`)
      //   : null;
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
    downSong(id, name, singer) {
      let nameStr = `${name}-${singer}`
      DownSong({ id, type: 'flac' }).then((res) => {
        if (res.result === 100) {
          this.$tip.show(`${nameStr}加入下载中`, 'success')
          this.$saveFile(res.data, nameStr, null, (e) => {
            if (e.type === 'error') {
              this.$tip.show(`下载${nameStr}出错`, 'error')
            } else {
              this.$tip.show(`下载成功${nameStr}`, 'success')
            }
          })
        } else {
          this.$tip.show(`获取${nameStr}下载链接出错`, 'error')
        }
      })
    },
    // 播放全部
    playAll() {
      for (let i = 0; i < this.detailList.length; i++) {
        this.reqList.push(this.detailList.splice(i, 10))
        i--
      }
      this.getSong()
    },
    // 获取歌曲链接
    getSong() {
      let tempList = this.reqList.shift()
      let urlList = tempList.map((item) => item.songmid),
        arr = urlList.join(','),
        result = []
      getSongUrl({ id: arr }).then((res) => {
        if (res.result === 100) {
          tempList.forEach((item, index) => {
            for (let i in res.data) {
              if (i === item.songmid) {
                item.playUrl = res.data[i]
                result.push(item)
                return
              }
            }
          })
          window.sessionStorage.setItem('reqList', JSON.stringify(this.reqList))
          window.sessionStorage.setItem('playList', JSON.stringify(result))
          this.$route.path !== '/player' ? this.$router.push('/player') : null
        } else {
          if (this.reqList.length !== 0) {
            this.getSong()
          } else {
            this.$tip.show(`获取播放链接出错`, 'error')
          }
        }
      })
    },
  },
  filters: {
    toFixed(value) {
      return value < 10000 ? `${value}` : `${(value / 10000).toFixed(1)}万`
    },
  },
}
</script>

<style lang="less" scoped>
.recDetail {
  padding-top: 0.9rem;
  background-color: #fefefe;
  .Listinfo {
    margin: 0.2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .imgBox {
      width: 3.5rem;
      height: 3.5rem;
      margin-bottom: 0.2rem;
      border-radius: 0.2rem;
      box-shadow: 0 0.07rem 0.13rem rgba(0, 0, 0, 0.21);
      .topImg {
        border-radius: 0.2rem;
        width: 100%;
      }
    }
    .info {
      margin-bottom: 0.2rem;
      .songName {
        margin-bottom: 0.2rem;
        font-size: 0.31rem;
        font-weight: 400;
      }
      .nick {
        margin-bottom: 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.25rem;
        vertical-align: middle;
        .nickImg {
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          margin-right: 0.05rem;
          vertical-align: middle;
        }
      }
      .play {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.24rem;
        color: gray;
      }
    }
    .playBtn {
      display: flex;
      width: 3.25rem;
      height: 0.68rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.1rem 0.4rem rgba(24, 213, 156, 0.5);
      background-color: #22d59c;
      justify-content: center;
      align-items: center;
      .icon_svg {
        width: 0.36rem;
        height: 0.36rem;
        fill: #fff;
      }
    }
  }
  .songListBox {
    padding: 0.2rem;
    .songNum {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.23rem;
      color: #808080;
      margin-left: 0.1rem;
      .totalNum {
        margin-left: 0.1rem;
      }
    }
    .songList {
      .songListItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 0.8rem;
        padding: 0.1rem;
        .itemBox {
          width: 88%;
          .itemName {
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.25rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .name {
              font-weight: 400;
            }
          }
          .singerName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.2rem;
            color: #1a1a1a80;
            .vip {
              height: 0.2rem;
              position: relative;
              bottom: 0.05rem;
            }
          }
        }
        .down {
          flex: 1;
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #b3b3b3;
            font-size: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
