<template>
  <main class="playerBox">
    <header class="back" @click="ToBack">
      <svg
        t="1596638502075"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2219"
        width="25"
        height="25"
      >
        <path
          fill="#fff"
          d="M622.4 1015.8c-8.8 0-17.6-3.3-24.2-10L193.6 601.2c-49.3-49.3-49.3-129.5 0-178.8L598.2 17.8c13.4-13.4 35.1-13.4 48.5 0 13.4 13.4 13.4 35.1 0 48.5L242.1 470.9c-22.5 22.6-22.5 59.2 0 81.8l404.6 404.6c13.4 13.4 13.4 35.1 0 48.5-6.7 6.7-15.5 10-24.3 10z"
          p-id="2220"
        ></path>
      </svg>
    </header>
    <!-- <canvas :width="pageWidth" :height="pageHeight"
      id="music-data-canvas"></canvas> -->
    <audio
      id="m-player"
      :src="playList[playIndex].playUrl"
      @timeupdate="GetCurrent()"
      @canplay="loaded()"
      @canplaythrough="canPlaied()"
      @ended="playEnd()"
      ref="playerRef"
    ></audio>
    <!-- 遮罩层 -->
    <div class="mark"></div>
    <div class="playInfo">
      <h2 class="title">{{ playList[playIndex].songname }}</h2>
      <p class="singer">{{ playList[playIndex].singer }}</p>
    </div>
    <div
      class="song-lyric"
      ref="conRef"
      :style="{ height: `${winH - 2.6 * winFont}px` }"
    >
      <div
        class="wrapper"
        @touchstart="EnterTouch($event)"
        @touchend="leaveTouch($event)"
        @touchmove="touchMoved($event)"
        ref="wrapperRef"
        :style="{
          transform: `translateY(${translateY}px)`,
          transition: `transform ${delay}s ease-out 0s`,
        }"
      >
        <div
          class="lyric-item"
          :id="`line_${index}`"
          :class="{ active: index === curIndex }"
          v-for="(item, index) in curKey"
          :key="index"
          ref="lyricRef"
        >
          <p>{{ lyricList[item].str }}</p>
          <p>
            {{ lyricList[item].trans }}
          </p>
        </div>
      </div>
    </div>
    <div class="footerBox">
      <div class="progressBox">
        <span class="already">{{ curTime || '00:00' }}</span>
        <div class="progress" @click="porgress($event)" ref="progressRef">
          <div class="current" :style="{ width: progressWidth }">
            <i></i>
          </div>
        </div>
        <span class="duration">{{ totlaTime }}</span>
      </div>
      <div class="btnBox">
        <span class="prev" @click="prevSong"
          ><i class="iconfont icon-kuaitui"></i
        ></span>
        <span class="status" @click="changeStatus">
          <i class="iconfont icon-zanting" v-show="!playStatus"></i>
          <i class="iconfont icon-bofang" v-show="playStatus"></i
        ></span>
        <span class="next" @click="nextSong"
          ><i class="iconfont icon-kuaijin"></i
        ></span>
      </div>
    </div>
  </main>
</template>

<script>
import { getSongUrl, getLyric } from './playReq'
import { handleLyric, handTrans, Num, debounce } from '../../common/utils'
export default {
  name: 'player',
  data() {
    return {
      // 歌词集合
      lyricList: {},
      // 歌词的时间集合
      curKey: [],
      // 当前window的fontsize
      winFont: null,
      // 当前窗口的高度
      winH: null,
      // 播放状态
      playStatus: false,
      // 进度条显示的当前时间
      curTime: null,
      // 进度条长度
      progressWidth: '0%',
      // 歌曲的总时间
      duration: null,
      // 进度条显示总时间
      totlaTime: null,
      // audio标签dom
      playDom: null,
      // 播放定时器
      // audioTimer: null,
      // 当前歌词高亮的index
      curIndex: 0,
      // 当前歌词容器的高度
      conH: null,
      // 歌词容器wrapper的高度
      wraH: 0,
      // 获取进度条的宽度
      proW: 0,
      // 获取进度条离窗口左侧的宽度
      proL: 0,
      // 歌词移动的高度
      translateY: 0,
      // 歌词移动动画时间
      delay: 0.2,
      // 防抖的歌词移动函数
      lyricMove: null,
      // 鼠标按下wrapper的y轴位置
      startY: 0,
      // 当前的高度
      curH: null,
      // 是否可以播放
      CanPlayStatus: false,
      // 当前播放的索引
      playIndex: 0,
      // 播放歌曲列表
      playList: [],
      // 第一次进播放器
      isFirst: true,
      // 滑动防抖事件
      touchMoved: null,
    }
  },
  created() {
    if (window.localStorage.getItem('playIndex')) {
      this.playIndex = Number(window.localStorage.getItem('playIndex'))
    }
    // console.log(window.localStorage.getItem("playIndex"));
    this.$emit('homeLoading', true)
    this.playList = JSON.parse(window.localStorage.getItem('playList'))
    this.getItemLyric()
  },
  beforeRouteLeave(to, from, next) {
    window.localStorage.removeItem('playIndex')
    this.$emit('homeLoading', false)
    next()
  },
  watch: {
    playStatus: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        if (newVal) {
          this.playDom.play()
          // this.audioTimer = setInterval(() => {
          // this.curTime = this.formatTooltip(this.playDom.currentTime);
          // // 计算进度条
          // if (this.playDom.currentTime < this.duration) {
          //   this.progressWidth =
          //     (this.playDom.currentTime / this.duration) * 100 + "%";
          // } else {
          //   this.playStatus = false;
          //   this.progressWidth = "100%";
          // }
          // if (this.curKey.length !== 1) {
          //   //获取最新的index,移动歌词
          //   this.curKey.forEach((item, index) => {
          //     if (item / 10 === Math.floor(this.playDom.currentTime * 100)) {
          //       // 经过防抖后的歌词移动处理函数
          //       this.curIndex = index;
          //       this.lyricMove(index);
          //       return;
          //     }
          //   });
          // }
          // console.log(Math.floor(this.playDom.currentTime * 100));
          // }, 5);
        } else {
          // console.log(11111111);
          this.playDom.pause()
          // clearInterval(this.audioTimer);
        }
      },
    },
  },
  mounted() {
    this.playDom = this.$refs.playerRef
    this.lyricMove = debounce(this.moveLyric, 5)
    this.touchMoved = debounce(this.moveTouch, 3)
    this.getParams()

    window.onresize = this.getParams
  },

  methods: {
    getItemLyric() {
      // 获取歌词并且格式化
      getLyric({ songmid: this.playList[this.playIndex].songmid })
        .then((res) => {
          if (res.result === 100) {
            let { lyric, trans } = res.data
            // console.log(lyric);
            let lyricObj = {}
            lyric && handleLyric(lyric, lyricObj)
            trans && handTrans(trans, lyricObj)
            if (Object.keys(lyricObj).length === 0) {
              lyricObj = {
                0: {
                  str: '此歌曲为没有填词的纯音乐，请您欣赏',
                },
              }
            }
            this.lyricList = lyricObj
            this.curKey = Object.keys(this.lyricList)
          }
          this.$emit('homeLoading', false)
        })
        .then(() => {
          this.wraH = this.$refs.wrapperRef.clientHeight
        })
    },
    // 格式化进度条时间
    formatTooltip(v) {
      let min = Math.floor(v / 60),
        sec = Math.floor(v - min * 60)
      min < 10 ? (min = '0' + min) : min
      sec < 10 ? (sec = '0' + sec) : sec
      return `${min}:${sec}`
    },
    getParams() {
      this.winFont = parseFloat(document.documentElement.style.fontSize)
      this.winH = document.documentElement.clientHeight
      // this.conH = this.$refs.conRef.clientHeight;
      this.conH = Math.floor((this.winH - 2.6 * this.winFont) * 1000) / 1000
      // console.log(Math.floor((this.winH - 2.6 * this.winFont) * 1000) / 1000);
      this.proW = this.$refs.progressRef.clientWidth
      this.proL = this.$refs.progressRef.offsetLeft
    },
    // 返回
    ToBack() {
      this.$router.go(-1)
      this.playStatus = false
    },
    // 点击进度条
    porgress(ev) {
      let curL = ev.clientX - this.proL
      this.playDom.currentTime = (curL / this.proW) * this.duration
      this.progressWidth = (curL / this.proW) * 100 + '%'
      if (this.curKey.length !== 1) {
        let index = this.curKey.findIndex(
          (item) => item >= this.playDom.currentTime * 1000
        )
        this.curIndex = index - 1
        this.lyricMove(index - 1)
      }
    },
    // 点击播放暂停按钮
    changeStatus() {
      // console.log(11111);
      // if (!this.playingUrl) return;
      if (this.CanPlayStatus) {
        this.playStatus = !this.playStatus
      } else {
        this.$tip.show(`请稍等一下，正在加载中`, 'info')
      }
    },
    // 移动歌词动画
    moveLyric(index) {
      if (this.$refs.lyricRef[index]) {
        this.curH =
          this.$refs.lyricRef[index].offsetHeight +
          this.$refs.lyricRef[index].offsetTop
        // console.log(this.curH, this.conH);
        if (this.curH >= this.conH * 0.5 && this.conH) {
          // let moveH = this.$refs.lyricRef[index].offsetHeight;
          // this.translateY -= moveH;
          // console.log(this.curH, this.conH, this.translateY);
          this.translateY = this.conH * 0.5 - this.curH
        }
      } else {
        // 移动到歌词最后
        if (this.curIndex === this.curKey.length - 1) return
        this.curIndex = this.curKey.length - 1
        // 最后的位置为容器高度60%加上2rem的padding
        this.translateY = -(
          this.wraH -
          this.conH * 0.5 -
          Math.floor(this.winFont * 2)
        )
      }
    },
    // 获取audio当前播放的时间，大概一秒一次
    GetCurrent() {
      this.curTime = this.formatTooltip(this.playDom.currentTime)
      // 计算进度条
      if (this.playDom.currentTime < this.duration) {
        this.progressWidth =
          (this.playDom.currentTime / this.duration) * 100 + '%'
      } else {
        this.playStatus = false
        this.progressWidth = '100%'
      }
      if (this.curKey.length !== 1) {
        //获取最新的index,移动歌词
        this.curKey.forEach((item, index) => {
          if (
            Math.floor(item / 1000) === Math.floor(this.playDom.currentTime)
          ) {
            // 经过防抖后的歌词移动处理函数
            this.curIndex = index
            this.lyricMove(index)
            return
          }
        })
      }
    },
    // audio加载完准备播放
    loaded() {
      this.CanPlayStatus = false
      this.duration = this.playDom.duration
      this.totlaTime = this.formatTooltip(this.playDom.duration)
    },
    // audio播放完成
    playEnd() {
      if (this.playList.length > 1) {
        this.nextSong()
      }
      this.translateY = 0
      this.progressWidth = '0%'
    },
    // audio加载完成，可以播放
    canPlaied() {
      this.CanPlayStatus = true
      if (this.isFirst) {
        this.isFirst = false
        return
      }
      this.playStatus = true
    },
    // 监听鼠标进入
    EnterTouch(ev) {
      if (this.curKey.length === 1) return
      ev.preventDefault()
      this.delay = 0
      this.startY = ev.changedTouches[0].clientY
    },
    // 监听滑动歌词事件
    moveTouch(ev) {
      // console.log(this.curKey.length === 1);
      // console.log(1111111);
      if (this.curKey.length === 1) return
      ev.preventDefault()
      // console.log("moveTouch", ev.changedTouches[0].clientY);
      if (this.translateY > this.conH * 0.5 - this.winFont * 2) {
        this.translateY = this.conH * 0.5 - this.winFont * 2
        return
      } else if (
        -this.translateY >
        this.wraH - this.conH * 0.5 - Math.floor(this.winFont * 2)
      ) {
        this.translateY = -(
          this.wraH -
          this.conH * 0.5 -
          Math.floor(this.winFont * 2)
        )
        return
      } else {
        this.translateY += ev.changedTouches[0].clientY - this.startY
        this.startY = ev.changedTouches[0].clientY
      }
    },
    // 手指离开
    leaveTouch(ev) {
      if (this.curKey.length === 1) return
      ev.preventDefault()
      this.delay = 0.2
    },
    // 切换上一首
    prevSong() {
      if (this.playList.length === 1) {
        this.playDom.load()
        this.initialize()
        return
      }
      if (this.playIndex === 0) {
        this.playIndex = this.playList.length - 1
      } else {
        this.playIndex -= 1
      }
      this.getItemLyric()
      this.initialize()
      window.localStorage.setItem('playIndex', this.playIndex)
    },
    // 切换下一首
    nextSong() {
      if (this.playList.length === 1) {
        this.playDom.load()
        this.initialize()
        return
      }
      if (this.playIndex === this.playList.length - 1) {
        this.playIndex = 0
      } else {
        this.playIndex += 1
      }
      this.getItemLyric()
      this.initialize()
      window.localStorage.setItem('playIndex', this.playIndex)
    },
    // 切歌状态初始化
    initialize() {
      this.translateY = 0
      this.progressWidth = '0%'
      this.playStatus = false
      this.curIndex = 0
      this.curTime = '00:00'
    },
  },
}
</script>

<style lang="less" scoped>
.playerBox {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  background: url('../../assets/img/1.png') no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  transform: translateY();
  overflow: auto;
  #music-data-canvas {
    z-index: -9999;
  }
  .back {
    height: 0.8rem;
    line-height: 0.8rem;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.1rem;
  }
  .mark {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .playInfo {
    box-sizing: border-box;
    line-height: 0.5rem;
    color: #fff;
    text-align: center;
    height: 1rem;
    // height: 10vh;
    max-width: 5.2rem;
    margin: 0 auto;
    position: relative;
    .title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 0.35rem;
    }
    .singer {
      font-size: 0.2rem;
    }
  }
  .song-lyric {
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    // height: 75vh;
    // padding: 2.5vh 0;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.5) 15%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.5) 85%,
      rgba(255, 255, 255, 0) 100%
    );

    &::-webkit-scrollbar {
      display: none;
    }
    .wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 2rem 0;
      .lyric-item {
        text-align: center;
        height: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.5);
        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 5rem;
        }
        &.active {
          color: #31c27c;
        }
      }
    }
  }
  .footerBox {
    padding: 0.1rem 0;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    // top: 0;
    height: 1.6rem;
    // height: 15vh;
    .progressBox {
      height: 0.5rem;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        // position: absolute;
        // top: 0;
        // width: 0.8rem;
        // height: 0.8rem;
        // line-height: 0.8rem;
        text-align: center;
        display: block;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 0.5);
        &.already {
          width: 1rem;
        }

        &.duration {
          width: 1rem;
        }
      }

      .progress {
        position: relative;
        // margin: 0.2rem auto;
        // width: 4rem;
        width: 72%;
        height: 0.04rem;
        background: rgba(255, 255, 255, 0.5);
        .current {
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: #31c27c;
          transform: 1s;

          i {
            position: absolute;
            top: 50%;
            right: -0.1rem;
            margin-top: -0.05rem;
            display: block;
            width: 0.1rem;
            height: 0.1rem;
            background-color: #fff;
          }
        }
      }
    }
    .btnBox {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        .iconfont {
          font-size: 0.5rem;
        }
        &.status {
          margin: 0rem 0.2rem;
        }
        .icon-zanting {
          font-size: 0.6rem;
        }
        .icon-bofang {
          font-size: 0.6rem;
        }
      }
    }
  }
}
</style>
