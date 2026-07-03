<template>
  <span class="tooltip-component" v-tooltip.bottom-start="message">{{
    txt
  }}</span>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["txt", "message"],
};
</script>

<style lang="scss" scoped>
.tooltip-component {
  background-color: #f5f4f4;
  padding: 2px;
  outline: 0.5px solid rgb(174, 172, 172);
  border-radius: 2px;

  &:hover {
    cursor: help;
  }
}
</style>
