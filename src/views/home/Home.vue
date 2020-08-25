<template>
  <div class="home">
    <homeTop></homeTop>
    <!-- <router-view class="main" @getTop="getTop" :bottomTop="bottomTop"> -->
    <div class="loading" v-show="Loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="mainBox" v-show="!Loading">
      <keep-alive>
        <router-view class="main" @showLoading="showLoading">
        </router-view>
      </keep-alive>
      <homeBottom ref="Bottom"></homeBottom>
    </div>
  </div>
</template>

<script>
import homeTop from "./children/HomeTop";
import homeBottom from "./children/HomeBottom";
export default {
  name: "Home",
  data() {
    return {
      Loading: false,
    };
  },
  components: {
    homeTop,
    homeBottom,
  },
  methods: {
    showLoading(val) {
      this.Loading = val;
    },
  },
  // methods: {
  //   getTop() {
  //     this.bottomTop = this.$refs.Bottom.$el.offsetTop;
  //   },
  // },
};
</script>

<style lang="less" scoped>
.home {
  .loading {
    width: 100%;
    background-color: #f4f4f4;
    height: 0.3rem;
    display: flex;
    justify-content: center;
    margin-top: 1.8rem;
  }
  .loading span {
    display: inline-block;
    width: 0.3rem;
    height: 100%;
    margin-right: 0.05rem;
    border-radius: 50%;
    background: lightgreen;
    -webkit-animation: load 1.04s ease infinite;
  }
  .loading span:last-child {
    margin-right: 0px;
  }
  @-webkit-keyframes load {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .loading span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
  }
  .loading span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
  }
  .loading span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
  }
  .loading span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
  }
  .loading span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
  }
  .mainBox {
    .main {
      margin-top: 1.6rem;
      padding-top: 0.2rem;
    }
  }
}
</style>
