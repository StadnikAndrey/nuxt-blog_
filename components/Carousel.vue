<template>
  <vue-horizontal ref="horizontal" :button-between="false">
    <div class="slide custom-horizontal__slide" v-for="(item, index) of slides" :key="index">
      <img :src="item.src" :alt="item.alt" />
    </div>
  </vue-horizontal>
</template>

<script>
import VueHorizontal from "vue-horizontal";
export default {
  name: "Carousel",
  props: ["slides"],
  components: {
    VueHorizontal,
  }
};
</script>

<style lang="scss">
.custom-horizontal {
  &__slide {
    // to display the img slider proportionally to the width
    width: 100%;
  }
}
</style>