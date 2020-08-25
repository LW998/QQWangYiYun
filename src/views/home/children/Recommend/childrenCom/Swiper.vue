<template>
  <div v-swiper:mySwiper="swiperOptions"
    v-if="swiperImgs.length !== 0">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in swiperImgs"
        :key="index">
        <img :src="item.picUrl" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "swiper",
  props: {
    swiperImgs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
      },
      oneOption: {
        slidesPerView: 1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  computed: {
    swiperOptions() {
      if (this.swiperImgs.length == 1) {
        return this.oneOption;
      } else {
        return this.swiperOption;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.swiper-wrapper {
  position: relative;
  width: 100%;
  box-sizing: content-box;
  text-align: center;
  .swiper-slide {
    flex-shrink: 0;
    max-width: 100%;
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
    img {
      // width: 6.3rem;
      width: 98%;
      max-height: 2.5rem;
      // max-height: 250px;
      visibility: inherit;
      display: inherit;
      background: #eee;
      border-radius: 4px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
.swiper-pagination {
  position: relative;
  bottom: 0.35rem;
}
</style>
