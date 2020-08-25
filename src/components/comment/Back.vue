<template>
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
        d="M622.4 1015.8c-8.8 0-17.6-3.3-24.2-10L193.6 601.2c-49.3-49.3-49.3-129.5 0-178.8L598.2 17.8c13.4-13.4 35.1-13.4 48.5 0 13.4 13.4 13.4 35.1 0 48.5L242.1 470.9c-22.5 22.6-22.5 59.2 0 81.8l404.6 404.6c13.4 13.4 13.4 35.1 0 48.5-6.7 6.7-15.5 10-24.3 10z"
        p-id="2220"
      ></path>
    </svg>
  </header>
</template>

<script>
export default {
  name: 'back',
  methods: {
    ToBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 0.8rem;
  max-width: 640px;
  margin: 0 auto;
  line-height: 0.8rem;
  position: fixed;
  z-index: 100;
  box-shadow: 0 0.6rem 0.35rem rgba(0, 0, 0, 0.05);
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.1rem;
}
</style>
