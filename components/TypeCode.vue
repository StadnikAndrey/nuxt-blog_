<template>
  <div class="code">
    <p class="code__lang">
      <span v-if="lang">{{ lang }}:</span>
    </p>
    <pre>
<code v-highlight :class="lang">{{ data }}</code>
</pre>
  </div>
</template>

<script>
export default {
  name: "TypeCode",
  props: ["lang", "content"],
  data() {
    return {
      data: null,
    };
  },
  created() {
    try {
      let code = JSON.parse(this.content);
      this.data = code;
    } catch (error) {
      console.log("error JSON.parse TypeCode.vue: ", error);
    }
  },
};
</script>

<style lang="scss" scoped>
.code {
  & pre {
    white-space: break-spaces;
    margin: 0;
  }

  &__lang {
    margin: 0;
  }
}
</style>