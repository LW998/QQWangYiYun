<template>
  <transition name="tip">
    <div class="tip" v-show="isShow">
      <p class="content" :style="{ backgroundColor: color }">
        {{ message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Tip",
  data() {
    return {
      message: "",
      isShow: false,
      color: "",
    };
  },
  methods: {
    show(message, type, duration = 1000) {
      this.isShow = true;
      this.message = message;
      switch (type) {
        case "info":
          this.color = "#5cb3cc";
          break;
        case "error":
          this.color = "#c21f30";
          break;
        case "success":
          this.color = "#45b787";
          break;
        case "waring":
          this.color = "#f0932b";
      }
      let timer = setTimeout(() => {
        this.isShow = false;
        clearTimeout(timer);
      }, duration);
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 10000;
  .content {
    min-width: 0.53rem;
    padding: 0.2rem 0.3rem;
    word-wrap: break-word;
    font-size: 0.25rem;
    color: #fff;
    line-height: 1.5;
    text-align: center;
    border-radius: 0.05rem;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.tip-enter-active {
  animation: ain 0.2s;
}
.tip-leave-active {
  animation: aout 0.25s;
}

.tip-enter-active {
  .content {
    animation: enter 0.75s;
  }
}
.tip-leave-active {
  .content {
    animation: leave 0.25s;
  }
}

@keyframes aout {
  100% {
    z-index: 9900;
  }
}
@keyframes ain {
  100% {
    z-index: 9900;
  }
}
@-webkit-keyframes enter {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
  20% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes enter {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }
  20% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  60% {
    opacity: 1;
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes leave {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes leave {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
