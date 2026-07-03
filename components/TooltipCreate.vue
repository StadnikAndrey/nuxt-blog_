<template>
  <div class="tooltip-create">
    <h3 class="tooltip-create__title">Tooltip constructor</h3>
    <form>
      <div class="form__row">
        <label class="form__label">Text tooltip</label>
        <input class="form__input" v-model="txt" @input="setTxtBtnCopyRes" type="text" />
      </div>
      <div class="form__row">
        <label class="form__label">Message tooltip</label>
        <input class="form__input" v-model="message" @input="setTxtBtnCopyRes" type="text" />
      </div>
    </form>
    <div class="tooltip-create__result">
      <button class="tooltip-create__btn-copy-res" type="button" @click="copyRes">
        {{ txtBtnCopyRes }}
      </button>
      <div>{{ res }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TooltipCreate",
  data() {
    return {
      txt: "",
      message: "",
      txtBtnCopyRes: "copy",
    };
  },
  computed: {
    res() {
      let params = {
        COMPONENT: "tooltip",
        props: {
          txt: this.txt,
          message: this.message,
        },
      };
      let json = JSON.stringify(params);

      let str = `<component>${json}</component>`;
      return str;
    },
  },
  methods: {
    copyRes() {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(this.res)
          .then(() => {
            this.txtBtnCopyRes = "copied!";
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      }
    },
    setTxtBtnCopyRes() {
      this.txtBtnCopyRes = "copy";
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip-create {
  width: 800px;

  &__title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__btn-copy-res {
    background-color: green;
    padding: 2px 8px;
    color: #fff;
    border-radius: 5px;
  }
}

@media screen and (max-width: 950px) {
  .tooltip-create {
    width: 100%;
    max-width: 800px;
  }
}
</style>