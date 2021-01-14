<template>
  <div class="loadBox"
       v-show="showLoad">
    <p class="loadText">{{more?'正在加载中':'已经没有更多了~'}}</p>
    <img src="../../assets/img/loading.png"
         alt=""
         class="loadImg"
         v-show="more">
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    showLoad: {
      type: Boolean,
      default () {
        return false;
      },
    },
    more: {
      type: Boolean,
      default () {
        return true;
      },
    }
  }
}
</script>

<style lang="less" scoped>
.loadBox {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .loadText {
    font-size: 0.25rem;
    font-family: "宋体";
  }
  .loadImg {
    width: 0.3rem;
    height: 0.3rem;
    margin-left: 5px;
    -webkit-animation: load 2s linear infinite;
  }
}

@-webkit-keyframes load {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>