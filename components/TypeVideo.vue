<template>
  <video class="video" :class="errorGet ? 'video--none' : ''" :src="src" controls @error="error"
    @loadeddata="loadeddata">
    Sorry, your browser doesn't support embedded videos.
  </video>
</template>

<script>
export default {
  name: "TypeVideo",
  props: ["src"],
  data() {
    return {
      errorGet: false,
    };
  },
  methods: {
    error() {
      this.errorGet = true;
    },
    loadeddata() {
      this.errorGet = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  &--none {
    display: none;
  }
}
</style>