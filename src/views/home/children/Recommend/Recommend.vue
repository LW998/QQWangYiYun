<template>
  <div class="recommend">
    <!-- <Search v-on="$listeners" v-bind="$attrs"></Search> -->
    <Search @changeActive="changeActive" ref="searchRef"></Search>
    <div v-show="!activeType">
      <Swiper :swiperImgs="bannerImg" class="Recswiper"></Swiper>
      <Album :activeType="activeType" v-on="$listeners"
        v-bind="$attrs"></Album>
    </div>
  </div>
</template>

<script>
import { getBanner } from "./RecommendReq";
import Swiper from "./childrenCom/Swiper";
import Search from "./childrenCom/Search";
import Album from "./childrenCom/Album";
export default {
  name: "Recommend",
  data() {
    return {
      bannerImg: [],
      activeType: false,
      scrollTop: null,
    };
  },
  components: {
    Search,
    Swiper,
    Album,
  },
  methods: {
    changeActive(status) {
      this.activeType = status;
    },
  },
  created() {
    this.$emit("showLoading", true);
    getBanner().then((res) => {
      if (res.result === 100) {
        this.bannerImg = res.data;
      }
      this.$emit("showLoading", false);
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.activeType) {
      document.documentElement.scrollTop = 0;
    }
    if (to.path !== "/recommend") {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    }
    this.$refs.searchRef.pageLeave();
    this.activeType = false;
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === "/recommend") {
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
.recommend {
  .Recswiper {
    position: relative;
    overflow: hidden;
    margin: auto;
    height: 100%;
  }
}
</style>
