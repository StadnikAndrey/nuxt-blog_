<template>
  <div class="accordeon-create">
    <h3 class="accordeon-create__title">Accordeon constructor</h3>
    <form class="accordeon-create__form">
      <div class="accordeon-create__form-group" v-for="(item, index) of sections" :key="index">
        <div class="form__row">
          <label class="form__label">Title</label>
          <input class="form__input" v-model.trim="item.title" @input="setTxtBtnCopyRes" type="text" />
        </div>
        <div class="form__row">
          <label class="form__label">Content</label>
          <input class="form__input" v-model.trim="item.content" @input="setTxtBtnCopyRes" type="text" />
        </div>
      </div>
      <button class="accordeon-create__btn-add-slide" type="button" title="add accordeon section" @click="addSection">
        +
      </button>
    </form>
    <div class="accordeon-create__result">
      <button class="accordeon-create__btn-copy-res" type="button" @click="copyRes">
        {{ txtBtnCopyRes }}
      </button>
      <div>{{ res }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccordeonCreate",
  data() {
    return {
      sections: [
        {
          title: "",
          content: "",
        },
      ],
      txtBtnCopyRes: "copy",
    };
  },
  computed: {
    res() {
      let sections = [];
      this.sections.forEach((item) => {
        if (item.title != "" && item.content != "") {
          sections.push(item);
        }
      });
      let params = {
        COMPONENT: "accordeon",
        props: {
          sections: JSON.stringify(sections),
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
    addSection() {
      let item = {
        title: "",
        content: "",
      };
      this.sections.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.accordeon-create {
  width: 80vw;
  max-width: 1200px;

  &__title {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__form {
    margin-bottom: 20px;
  }

  &__form-group {
    border: 2px solid rgba(#000000, 0.2);
    padding: 10px;
    border-radius: 10px;
  }

  &__btn-add-slide {
    display: block;
    font-size: 40px;
    font-weight: bold;
    margin-left: auto;
  }

  &__result {
    margin-bottom: 20px;
  }

  &__btn-copy-res {
    background-color: green;
    padding: 2px 8px;
    color: #fff;
    border-radius: 5px;
  }
}
</style>