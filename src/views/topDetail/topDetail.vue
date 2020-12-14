<template>
  <main class="topDetail" v-if="Object.keys(topDetailList).length !== 0">
    <back></back>
    <section class="Listinfo">
      <div class="imgBox">
        <img :src="topDetailList.logo" alt="" class="topImg" />
      </div>
      <div class="info">
        <h2 class="songName">{{ topDetailList.title }}</h2>
        <p class="week">
          {{ topDetailList.titleDetail }}
        </p>
        <p class="update">更新时间: {{ topDetailList.update }}</p>
      </div>
      <a href="javascript:;" class="playBtn" @click="playAll"
        ><svg class="icon_svg">
          <use xlink:href="#icon_arr">
            <svg id="icon_arr" viewBox="0 0 32 32">
              <path
                d="M29.4,17.6c-0.3,0.4-0.6,0.8-1.1,1L6.7,31.6c-1.4,0.9-3.4,0.4-4.2-1C2.2,30,2,29.5,2,28.9V3.1C2,1.4,3.4,0,5.1,0
	c0.6,0,1.2,0.2,1.7,0.4l21.6,12.9C29.8,14.2,30.3,16.1,29.4,17.6z"
              ></path>
            </svg>
          </use></svg
      ></a>
    </section>
    <section class="songListBox">
      <div class="songNum">
        歌单
        <span class="totalNum">共{{ topDetailList.list.length }}首</span>
      </div>
      <ul class="songList">
        <li
          class="songListItem"
          v-for="(item, index) in topDetailList.list"
          :key="index"
        >
          <div class="indexBox" @click="playSong(item.songmid)">
            <p
              class="indexNum"
              :style="{ color: item.rank < 4 ? '#f56273' : '#808080' }"
            >
              {{ item.rank }}
            </p>
            <p class="indexChange">
              <svg class="icon_svg">
                <use xlink:href="#icon_rank_up" v-if="item.rankType == 1">
                  <svg id="icon_rank_up" viewBox="0 0 32 32">
                    <path
                      fill="#979797"
                      d="M11.9,14.4c-1.3,1.2-3.3,1-4.4-0.5S6.6,10.2,7.9,9l8.8-8.2c1.1-1,2.7-1.1,3.9-0.1l9.3,8.2
	c1.4,1.2,1.6,3.4,0.5,4.9s-3,1.8-4.4,0.6L18.7,8L11.9,14.4z M15.9,8c-0.2-1.7,1.1-3.2,2.7-3.3c1.7-0.2,3.2,1.1,3.3,2.7
	C23.5,23.2,17.3,32,4,32c-1.7,0-3-1.4-3-3c0-1.7,1.4-3,3-3C13.3,25.9,17.1,20.5,15.9,8z"
                    ></path>
                  </svg>
                </use>
                <use xlink:href="#icon_rank_down" v-if="item.rankType == 2">
                  <svg id="icon_rank_down" viewBox="0 0 32 32">
                    <path
                      fill="#979797"
                      d="M11.9,17.6c-1.3-1.2-3.3-1-4.4,0.5c-1.1,1.5-0.9,3.7,0.4,4.9l8.8,8.2c1.1,1,2.7,1.1,3.9,0.1
	l9.3-8.2c1.4-1.2,1.6-3.4,0.5-4.9c-1.1-1.5-3-1.8-4.4-0.6L18.7,24L11.9,17.6z M15.9,24c-0.2,1.7,1.1,3.2,2.7,3.3s3.2-1.1,3.3-2.7
	C23.5,8.8,17.3,0,4,0c-1.7,0-3,1.4-3,3s1.4,3,3,3C13.3,6.1,17.1,11.5,15.9,24z"
                    ></path>
                  </svg>
                </use>
                <use
                  xlink:href="#icon_rank_invariant"
                  v-if="item.rankType == 3"
                >
                  <svg id="icon_rank_invariant" viewBox="0 0 32 32">
                    <path
                      fill="#979797"
                      d="M2.7,13.8h26.6c1.2,0,2.2,1,2.2,2.2l0,0c0,1.2-1,2.2-2.2,2.2H2.7c-1.2,0-2.2-1-2.2-2.2l0,0
	C0.5,14.8,1.5,13.8,2.7,13.8z M29.3,18.7H2.7C1.2,18.7,0,17.5,0,16s1.2-2.7,2.7-2.7h26.6c1.5,0,2.7,1.2,2.7,2.7S30.8,18.7,29.3,18.7
	z M2.7,14.3C1.7,14.3,1,15,1,16c0,1,0.8,1.7,1.7,1.7h26.6c1,0,1.7-0.8,1.7-1.7c0-1-0.8-1.7-1.7-1.7H2.7z"
                    ></path>
                  </svg>
                </use>
                <use xlink:href="#icon_rank_new" v-if="item.rankType == 4">
                  <svg id="icon_rank_new" viewBox="0 0 32 10">
                    <text
                      transform="matrix(1 0 0 1 -0.3998 10)"
                      fill="#F56273"
                      font-family="'PingFang-SC-Medium'"
                      font-size="14"
                    >
                      NEW
                    </text>
                  </svg>
                </use>
                <use xlink:href="#icon_rank_surge" v-if="item.rankType == 6">
                  <svg id="icon_rank_surge" viewBox="0 0 32 32">
                    <path
                      fill="#f56273"
                      d="M11.9,14.4c-1.3,1.2-3.3,1-4.4-0.5S6.6,10.2,7.9,9l8.8-8.2c1.1-1,2.7-1.1,3.9-0.1l9.3,8.2
	c1.4,1.2,1.6,3.4,0.5,4.9s-3,1.8-4.4,0.6L18.7,8L11.9,14.4z M15.9,8c-0.2-1.7,1.1-3.2,2.7-3.3c1.7-0.2,3.2,1.1,3.3,2.7
	C23.5,23.2,17.3,32,4,32c-1.7,0-3-1.4-3-3c0-1.7,1.4-3,3-3C13.3,25.9,17.1,20.5,15.9,8z"
                    ></path>
                  </svg>
                </use>
              </svg>
              {{ item.rankValue }}
            </p>
          </div>
          <div
            class="itemBox"
            @click="playSong(item.songmid, item.songname, item.singer)"
          >
            <h3 class="itemName">
              <span class="name">{{ item.songname }}</span>
            </h3>
            <p class="singerName">{{ item.singer }}</p>
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
import { getTopDetail, DownSong, getSongUrl } from './topReq'
export default {
  name: 'topDetail',
  data() {
    return {
      id: null,
      topDetailList: {},
    }
  },
  created() {
    this.$emit('homeLoading', true)
    this.id = this.$route.params.id
    getTopDetail({
      id: this.id,
    }).then((res) => {
      if (res.result === 100) {
        this.topDetailList = res.data
      }
      this.$emit('homeLoading', false)
    })
  },
  beforeRouteLeave(to, from, next) {
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
    // 播放所有歌曲
    playAll() {
      let arr = this.topDetailList.list.map((item) => item.songmid).join(','),
        result = []
      getSongUrl({ id: arr }).then((res) => {
        if (res.result === 100) {
          this.topDetailList.list.forEach((item, index) => {
            for (let i in res.data) {
              if (i === item.songmid) {
                item.playUrl = res.data[i]
                result.push(item)
                return
              }
            }
          })
          window.sessionStorage.setItem('playList', JSON.stringify(result))
          this.$route.path !== '/player' ? this.$router.push('/player') : null
        }
      })
    },
    downSong(id, name, singer) {
      let nameStr = `${name}-${singer}`
      DownSong({ id, type: 'flac' }).then((res) => {
        if (res.result === 100) {
          this.$tip.show(`${nameStr}加入下载中`, 'success')
          // `/down/${res.data}`
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
  },
}
</script>

<style lang="less" scoped>
.topDetail {
  padding-top: 0.9rem;
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
        font-size: 0.32rem;
        font-weight: 500;
        height: 0.4rem;
        color: #121212;
        line-height: 0.4rem;
        text-align: center;
      }
      .week {
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.24rem;
        font-size: 0.28rem;
        font-weight: 400;
        color: #121212;
        margin-bottom: 0.2rem;
      }
      .update {
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
    .songNum {
      padding: 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.23rem;
      color: #808080;
      .totalNum {
        margin-left: 0.1rem;
      }
    }
    .songList {
      padding: 0.2rem 0.2rem 0.2rem 0;
      .songListItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        .indexBox {
          height: 100%;
          width: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          .indexNum {
            font-size: 0.23rem;
            font-weight: 400;
          }
          .indexChange {
            display: flex;
            font-size: 0.18rem;
            .icon_svg {
              width: 0.15rem;
              height: 0.15rem;
              position: relative;
              top: 0.05rem;
              margin-right: 0.02rem;
            }
          }
        }
        .itemBox {
          flex: 1;
          .itemName {
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.25rem;
            max-width: 4.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .name {
              font-weight: 400;
              max-width: 4.5rem;
            }
          }
          .singerName {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 0.3rem;
            line-height: 0.3rem;
            max-width: 4.5rem;
            font-size: 0.2rem;
            color: #1a1a1a80;
          }
        }
        .down {
          display: block;
          position: relative;
          width: 0.8rem;
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
