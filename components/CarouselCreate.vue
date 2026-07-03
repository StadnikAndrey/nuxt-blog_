<template>
  <div class="carousel-create">
    <h3 class="carousel-create__title">Carousel constructor</h3>
    <form class="carousel-create__form">
      <div class="carousel-create__form-group" v-for="(item, index) of slides" :key="index">
        <div class="form__row">
          <label class="form__label">Image Link</label>
          <input class="form__input" v-model.trim="item.src" @input="setTxtBtnCopyRes" type="text" />
        </div>
        <div class="form__row">
          <label class="form__label">Alternative text</label>
          <input class="form__input" v-model.trim="item.alt" @input="setTxtBtnCopyRes" type="text" />
        </div>
      </div>
      <button class="carousel-create__btn-add-slide" type="button" title="add slide" @click="addSlide">
        +
      </button>
    </form>
    <div class="carousel-create__result">
      <button class="carousel-create__btn-copy-res" type="button" @click="copyRes">
        {{ txtBtnCopyRes }}
      </button>
      <div>{{ res }}</div>
    </div>
    <CRUDimg />
  </div>
</template>

<script>
import CRUDimg from "@/components/CRUDimg.vue";
export default {
  name: "CarouselCreate",
  components: {
    CRUDimg,
  },
  data() {
    return {
      slides: [
        {
          src: "",
          alt: "",
        },
      ],
      txtBtnCopyRes: "copy",
    };
  },
  computed: {
    res() {
      let slides = [];
      this.slides.forEach((item) => {
        if (item.src != "") {
          slides.push(item);
        }
      });
      let params = {
        COMPONENT: "carousel",
        props: {
          slides: slides,
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
    addSlide() {
      let item = {
        src: "",
        alt: "",
      };
      this.slides.push(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-create {
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