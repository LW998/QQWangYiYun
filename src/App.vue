<template>
  <div id="app">
    <!-- <keep-alive exclude="RecDetail">
      <router-view></router-view>
    </keep-alive> -->
    <div class="loading" v-show="Loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <div class="mainBox" v-show="!Loading">
      <router-view
        v-if="!this.$route.meta.keepAlive"
        @homeLoading="homeLoading"
      ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      Loading: false,
    }
  },
  methods: {
    homeLoading(val) {
      this.Loading = val
    },
  },
}
</script>

<style lang="less" scoped>
#app {
  margin: 0 auto;
  background-color: #f9f9f9;
  max-width: 640px;
  position: relative;
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
}
</style>
