<template>
  <footer class="foot">
    <div class="imgBox"><img
        src="http://s3.music.126.net/mobile-new/img/circle_logo.png?9647b494bc57cc5d76081bee7c12ad00"
        alt="" class="logoImg">
      <span class="imgText">网抑云音乐</span></div>
    <p class="copy">Copyright © 2019 - 2020 liwei.fun Rights Reserved.
    </p>
    <!-- <p class="tel">联系电话：0755-86013388 QQ群：55209235</p> -->
    <p class="tel">湘ICP备20003280号</p>
  </footer>
</template>

<script>
export default {
  name: "HomeBottom",
};
</script>
<style lang="less" scoped>
.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 0.2rem 0;
  .imgBox {
    width: 2.7rem;
    height: 0.6rem;
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logoImg {
      width: 0.5rem;
      height: 0.5rem;
    }
    .imgText {
      font-size: 0.35rem;
      font-weight: 500;
      letter-spacing: 0.05rem;
      position: relative;
      top: -0.03rem;
    }
  }
}
</style>