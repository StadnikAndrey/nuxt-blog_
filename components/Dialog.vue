<template>
  <div class="dialog" :class="show ? 'dialog--active' : ''">
    <div class="dialog__content">
      <button class="dialog__btn-close" type="button" @click="close">
        CLOSE
      </button>
      <slot>dialog</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: ["active"],
  data() {
    return {
      show: this.active,
    };
  },
  watch: {
    active() {
      this.show = this.active;
    },
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("active", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(#000, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: z-index, opacity;

  &--active {
    z-index: 9999;
    opacity: 1;

    & .dialog__content {
      opacity: 1;
      transition-duration: .2s;
    }
  }

  &__content {
    background-color: #fff;
    padding: 10px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    opacity: 0;
    transition: opacity .15s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: opacity;
  }

  &__btn-close {
    background-color: royalblue;
    color: #fff;
    padding: 4px 8px;
    font-size: 16px;
    border-radius: 4px;
    margin: 0 0 20px auto;
    display: block;
  }
}
</style>