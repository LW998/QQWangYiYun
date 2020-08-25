<template>
  <section class="back" @click="backT">
    <i class="iconfont icon-backtop"></i>
  </section>
</template>

<script>
export default {
  name: "BackTop",
  //   data() {
  //     return {
  //       scrollToptimer: null,
  //       top: null,
  //     };
  //   },
  //   mounted() {
  //     window.addEventListener("scroll", this.scrolled);
  //   },

  methods: {
    backT() {
      //   this.scrollToptimer = setInterval(function () {
      //     // console.log("定时循环回到顶部");
      //     let top = document.documentElement.scrollTop || document.body.scrollTop;
      //     let speed = this.top / 4;
      //     if (document.documentElement.scrollTop != 0) {
      //       document.documentElement.scrollTop -= speed;
      //     } else {
      //       document.body.scrollTop -= speed;
      //     }
      //   }, 30);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      } else {
        document.body.scrollTop = 0;
      }
    },
    // scrolled() {
    //   this.top = document.documentElement.scrollTop || document.body.scrollTop;
    //   if (this.top === 0) {
    //     console.log(1111111111111);
    //     clearInterval(this.scrollToptimer);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.back {
  position: fixed;
  z-index: 999;
  right: 0.3rem;
  bottom: 0.8rem;

  width: 0.6rem;
  height: 0.6rem;
  border: 1px solid #1a1a1a80;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  .iconfont {
    color: #1a1a1a80;
    font-size: 0.4rem;
    text-align: center;
  }
}
</style>