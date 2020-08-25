<template>
  <header class="headBox">
    <section class="operation">
      <span class="logo">
        <img
          src="http://s3.music.126.net/mobile-new/img/circle_logo.png?9647b494bc57cc5d76081bee7c12ad00"
          alt="" class="logoImg" />
      </span>
      <div class="logoTip">
        <h2 class="logoTitle">网抑云音乐</h2>
        <p class="logoText">生而为人，我很抱歉</p>
      </div>
      <a href="javascript:;" class="downTip">随便看看</a>
    </section>
    <section class="menuebar">
      <nav class="menueList">
        <router-link to="/recommend" tag="div" class="menueItem"
          @click.native="menueClick(1)"
          :class="{active:curIndex ===1}">
          <span>推荐</span></router-link>
        <router-link to="/toplist" tag="div" class="menueItem"
          @click.native="menueClick(2)"
          :class="{active:curIndex ===2}">
          <span>排行</span></router-link>
        <!--  <div class="menueItem" @click="menueClick(1)"
          :class="{active:curIndex ===1}"><span>推荐</span>
        </div>
        <div class="menueItem" @click="menueClick(2)"
          :class="{active:curIndex ===2}"><span>排行</span>
        </div> -->
      </nav>
    </section>
  </header>
</template>

<script>
export default {
  name: "HomeTop",
  data() {
    return {
      // curIndex: 1,
    };
  },
  methods: {
    menueClick(i) {
      this.curIndex = i;
    },
  },
  computed: {
    curIndex: {
      get() {
        if (this.$route.path === "/recommend") {
          return 1;
        } else if (this.$route.path === "/toplist") {
          return 2;
        }
      },
      set(i) {},
    },
  },
};
</script>

<style lang="less" scoped>
.headBox {
  width: 100%;
  max-width: 640px;
  margin: -1px auto;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0.6rem 0.35rem rgba(0, 0, 0, 0.05);
  .operation {
    display: flex;
    padding: 0 0.25rem;
    justify-content: center;
    align-items: center;
    height: 1rem;
    font-size: 0.5rem;
    .logo {
      width: 1rem;
      position: relative;
      .logoImg {
        width: 0.5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .logoTip {
      width: 5rem;
      height: 0.8rem;
      .logoTitle {
        font-size: 0.3rem;
        letter-spacing: 0.03rem;
        font-weight: 500;
      }
      .logoText {
        font-size: 0.2rem;
        color: #808080;
      }
    }
    .downTip {
      width: 2rem;
      font-size: 0.24rem;
      color: #575656;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      border: 1px solid #d8d8d8;
      border-radius: 0.25rem;
    }
  }
  .menuebar {
    height: 0.6rem;
    .menueList {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #808080;
      font-size: 0.3rem;
      .menueItem {
        flex: 1;
        text-align: center;
      }
      .active {
        color: #22d59c;
        span {
          border-bottom: 3px solid #22d59c;
          padding: 5px;
        }
      }
    }
  }
}
</style>