<template>
  <div class="accordeon">
    <div class="accordeon__section" v-for="(item, index) of data" :key="index">
      <div class="accordeon__section-title" @click="toggleShowContent($event, index)">
        <span class="accordeon__section-title-txt">{{ item.title }}</span>
        <img class="accordeon__title-arrow" :ref="`img${index}`" src="~/assets/img/arrow-expand.svg" alt="" />
      </div>
      <div class="accordeon__section-content" :ref="`content${index}`">
        <div class="accordeon__section-content-inner" :ref="`contentInner${index}`" v-html="item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordeon",
  props: ["sections"],
  data() {
    return {
      data:
        typeof this.sections == "string"
          ? JSON.parse(this.sections)
          : this.sections, // for compatibility with previously added articles
    };
  },
  methods: {
    toggleShowContent(e, num) {
      if (process.client == true) {
        let refContent = `content${num}`;
        let content = this.$refs[refContent][0];
        let refContentInner = `contentInner${num}`;
        let contentInner = this.$refs[refContentInner][0];
        let refImg = `img${num}`;
        let img = this.$refs[refImg][0];
        let maxHeightContent = parseFloat(getComputedStyle(content).maxHeight);
        if (maxHeightContent > 0 || isNaN(maxHeightContent)) {
          content.style.maxHeight = 0;
          img.classList.remove("accordeon__title-arrow--transform");
        } else {
          content.style.maxHeight = contentInner.scrollHeight + "px";
          img.classList.add("accordeon__title-arrow--transform");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.accordeon {
  &__section {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      -23px 0 20px -23px rgba(0, 0, 0, 0.8),
      23px 0 20px -23px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 10px;
  }

  &__section-title {
    display: flex;
    align-items: center;
    width: fit-content;

    &:hover {
      cursor: pointer;
    }
  }

  &__title-arrow {
    border: none;
    display: inline;
    margin: 0;
    height: 20px;

    &--transform {
      transform: rotate(180deg);
    }
  }

  &__section-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in-out;
  }
}
</style>