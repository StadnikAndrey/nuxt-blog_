<template>
  <div class="code-create">
    <h3 class="code-create__title">Add code constructor</h3>
    <form>
      <div class="form__row">
        <label class="form__label">Lang</label>
        <select v-model="lang" @change="setTxtBtnCopyRes">
          <option selected value="" disabled>choise</option>
          <option v-for="item of langs" :value="item.name" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form__row">
        <label class="form__label">Code</label>
        <textarea class="code-create__textarea" rows="10" v-model="code" @input="setTxtBtnCopyRes"></textarea>
      </div>
    </form>
    <div class="code-create__result">
      <button class="code-create__btn-copy-res" type="button" @click="copyRes">
        {{ txtBtnCopyRes }}
      </button>
      <div>{{ res }}</div>
    </div>
  </div>
</template>

<script>
import langs from "@/assets/data-files/langs-highlightjs";
export default {
  name: "TypeCodeCreate",

  data() {
    return {
      langs: langs,
      lang: "",
      code: ``,
      txtBtnCopyRes: "copy",
    };
  },
  computed: {
    res() {
      let params = {
        COMPONENT: "typecode",
        props: {
          lang: this.lang,
          content: JSON.stringify(this.code),
        },
      };
      let json = JSON.stringify(params);
      return json;
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
.code-create {
  width: 800px;

  &__title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  & select option:disabled {
    color: grey;
  }

  &__textarea {
    width: 100%;
    max-width: 100%;
  }

  &__btn-copy-res {
    background-color: green;
    padding: 2px 8px;
    color: #fff;
    border-radius: 5px;
  }
}

@media screen and (max-width: 950px) {
  .code-create {
    width: 100%;
    max-width: 800px;
  }
}
</style>