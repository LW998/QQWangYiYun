<template>
  <main class="topList">
    <section class="category" v-for="(item,index) in topList"
      :key="index">
      <!-- 榜单头 -->
      <header class="categoryTitle">
        <h2 class="title">{{item.title}}</h2>
      </header>
      <section class="categoryItem" v-for="(rank,num) in item.list"
        :key="num">
        <ul class="rankList">
          <!-- 每个榜单项 -->
          <li class="rankItem" @click="toRanDetail(rank.topId)">
            <!-- 榜单左边详情部分 -->
            <div class="bd">
              <h3 class="bdTitle">{{rank.label}}</h3>
              <!-- 榜单前三歌曲 -->
              <ol class="bdSongList">
                <li class="songListItem" v-for="(song,i) in rank.song"
                  :key="i">
                  <strong class="rank">{{song.rank}}.</strong>
                  <span class="name">{{song.title}}</span>
                  -
                  <span class="singer">{{song.singer}}</span>
                </li>
              </ol>
            </div>
            <!-- 榜单右边图片 -->
            <div class="bdImgBox">
              <img :src="rank.picUrl" alt="" class="bdImg">
              <span class="updateType">{{rank.updateTips}}</span>
              <p class="listen">
                <i class="iconfont icon-shiting"></i>
                <span
                  class="listenNum">{{rank.listenNum |toFixed}}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>

<script>
import { getTop } from "./topListReq";
export default {
  name: "TopList",
  data() {
    return {
      topList: null,
      scrollTop: null,
    };
  },
  methods: {
    toRanDetail(id) {
      this.$route.path !== "/topdetail/" + id
        ? this.$router.push("/topdetail/" + id)
        : null;
    },
  },
  created() {
    this.$emit("showLoading", true);
    getTop().then((res) => {
      if (res.result === 100) {
        this.topList = res.data;
      }
      this.$emit("showLoading", false);
    });
  },
  filters: {
    toFixed(value) {
      return value < 10000 ? `${value}` : `${(value / 10000).toFixed(1)}万`;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/toplist") {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/toplist") {
      next((vm) => {
        if (document.documentElement) {
          document.documentElement.scrollTop = vm.scrollTop;
        } else {
          document.body.scrollTop = vm.scrollTop;
        }
      });
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
.topList {
  width: 100%;
  .category {
    margin: 0 auto;
    width: 95%;
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    // 榜单头
    .categoryTitle {
      background-color: #d8e3e7;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin: 0.2rem 0;
      font-family: "华文楷体";
      border-radius: 0.5rem;
      .title {
        font-size: 0.5rem;
      }
    }
    //每个榜单分类盒子
    .categoryItem {
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      .rankList {
        // 每个榜单项
        .rankItem {
          display: flex;
          //  榜单左边详情部分
          margin: 0.1rem 0;
          justify-content: center;
          background-color: #fff;
          border-radius: 0.15rem;
          .bd {
            width: 70%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            .bdTitle {
              margin-left: 0.22rem;
              font-size: 0.27rem;
              font-weight: bold;
            }
            //  榜单前三歌曲
            .bdSongList {
              width: 95%;
              padding: 0 0.1rem;
              .songListItem {
                margin: 0 0.12rem 0.04rem;
                max-width: 5rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 0.2rem;

                //  排名
                .rank {
                  font-weight: bold;
                }
                .name {
                  color: #1a1a1a;
                }
                .singer {
                  color: #1a1a1a80;
                }
              }
            }
          }
          .bdImgBox {
            width: 30%;
            position: relative;
            .bdImg {
              width: 100%;
              border-top-right-radius: 0.15rem;
              border-bottom-right-radius: 0.15rem;
            }
            .updateType {
              position: absolute;
              top: 0.1rem;
              right: 0.1rem;
              color: #fff;
              font-size: 0.18rem;
            }
            .listen {
              position: absolute;
              bottom: 0.01rem;
              right: 0;
              color: #fff;
              vertical-align: middle;
              height: 0.3rem;
              line-height: 0.3rem;
              padding: 0 0.13rem;
              background-color: rgba(0, 0, 0, 0.4);
              border-radius: 0.15rem;
              .iconfont {
                font-size: 0.18rem;
                margin-right: 0.05rem;
              }
              .listenNum {
                font-size: 0.2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>