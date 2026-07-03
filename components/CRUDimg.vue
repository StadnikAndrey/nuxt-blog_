<template>
  <div class="crud-img">
    <h1 class="crud-img__title">Images management</h1>
    <div v-if="!errorServer">
      <form class="crud-img__form-upload">
        <div class="crud-img__form-row">
          <label class="crud-img__label-img" for="inpFileImg" title="change images for upload server">+</label>
          <input id="inpFileImg" class="crud-img__input-img" type="file" accept="image/*" multiple
            @change="changeScreenshot($event)" ref="inpFile" />
        </div>
        <div class="form__screenshots-inner">
          <div class="form__screenshots-item" v-for="i of screenshots" :key="i.name">
            <button class="form__icon-del" type="button" @click="deleteScreenshot($event, i.name)">
              &#215;
            </button>
            <div>{{ i.name }}</div>
            <img :src="i.src" alt="" />
          </div>
        </div>

        <button class="crud-img__btn-img" type="button" v-if="uploadedImgs.length > 0" @click="uploadImgs">
          upload to server
        </button>
        <div class="crud-img__progress-bar" :class="progressUploadImg ? 'crud-img__progress-bar--activ' : ''"></div>
      </form>

      <p class="crud-img__txt-change-img">
        Select the image by clicking on it and paste the resulting line in the
        editor
      </p>

      <div class="crud-img__wrap-imgs" v-if="imgs">
        <img class="crud-img__img" v-for="item of imgs" :key="item" :src="`${$nuxt.$config.pathImgServer}${item}`"
          alt="" @click="copyImgNameСlipboard($event, item)" />
      </div>

      <p class="crud-img__tooltip-success-copie" :style="styleSuccessCopy">
        copied!
      </p>
    </div>
    <p v-else>Impossible to work with images. Server error.</p>
  </div>
</template>

<script>
export default {
  name: "CRUDimg",
  data() {
    return {
      imgs: [],
      styleSuccessCopy: {
        left: "-100%",
        top: 0,
      },
      uploadedImgs: [],
      screenshots: [],
      progressUploadImg: false,
      errorServer: false,
    };
  },
  created() {
    this.getImgs();
  },
  methods: {
    async getImgs() {
      if (process.client) {
        let res = await this.$axios.$get("/api/imgs").catch((e) => {
          this.errorServer = true;
          console.log("error get images", e);
        });
        if (res && res.ok) {
          this.errorServer = false;
          this.imgs = res.data;
        } else if (res && res.ok == false) {
          this.errorServer = true;
        }
      }
    },
    copyImgNameСlipboard(e, name) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(`${$nuxt.$config.pathImgServer}${name}`)
          .then(() => {
            this.styleSuccessCopy = {
              left: `${e.clientX}px`,
              top: `${e.clientY}px`,
            };
            setTimeout(() => {
              this.styleSuccessCopy = {
                left: "-100%",
                top: 0,
              };
            }, 200);
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      }
    },
    changeScreenshot(e) {
      this.uploadedImgs = e.target.files;
      let imgs = [];
      for (const iterator of this.uploadedImgs) {
        let item = {
          name: iterator.name,
          src: URL.createObjectURL(iterator),
        };
        imgs.push(item);
      }
      this.screenshots = imgs;
    },
    deleteScreenshot($event, name) {
      let dt = new DataTransfer();
      for (var i = 0; i < this.uploadedImgs.length; i++) {
        if (this.uploadedImgs[i].name != name) {
          dt.items.add(this.uploadedImgs[i]);
        }
      }
      this.uploadedImgs = dt.files;
      let srcs = [];
      for (const iterator of this.uploadedImgs) {
        let item = {
          name: iterator.name,
          src: URL.createObjectURL(iterator),
        };
        srcs.push(item);
      }
      this.screenshots = srcs;
      if (this.screenshots.length === 0) {
        this.$refs["inpFile"].value = "";
      }
    },
    async uploadImgs() {
      this.progressUploadImg = true;
      let body = new FormData();
      for (const iterator of this.uploadedImgs) {
        body.append("imgs", iterator, iterator.name);
      }
      let res = await this.$axios.$post("/api/add-img", body).catch((e) => {
        this.progressUploadImg = false;
        this.uploadedImgs = [];
        this.screenshots = [];
        this.errorServer = true;
        console.log("error upload images on server", e);
      });
      if (res && res.ok) {
        this.uploadedImgs = [];
        this.screenshots = [];
        this.getImgs();
        this.progressUploadImg = false;
      } else if (res && res.ok == false) {
        this.progressUploadImg = false;
        this.errorServer = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.crud-img {
  width: 80vw;
  max-width: 1200px;

  &__title {
    font-size: 25px;
    margin-bottom: 25px;
    font-weight: bold;
  }

  &__txt-change-img {
    margin-bottom: 15px;
  }

  &__wrap-imgs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
  }

  &__img {
    max-width: calc(200px - 10px);
  }

  &__tooltip-success-copie {
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 2px 5px;
    position: absolute;
    transform: translateX(-50%) translateY(-100%);
  }

  &__form-upload {
    margin-bottom: 20px;
    border: 1px solid grey;
    padding: 10px;
  }

  &__label-img {
    font-size: 50px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }

  &__input-img {
    display: none;
  }

  &__btn-img {
    background-color: #f9f7e8;
    color: #62bfad;
    font-weight: bolder;
    padding: 4px 8px;
    margin-bottom: 10px;
  }

  &__progress-bar {
    height: 10px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    background: linear-gradient(to right, #acd, #fff 30px, #acd 60px) no-repeat -100px 0/100px 100%,
      #acd;
    animation: move 1s linear infinite;
    visibility: hidden;

    &--activ {
      visibility: visible;
    }
  }
}

@keyframes move {
  from {
    background-position: -100px 0;
  }

  to {
    background-position: 120% 0;
  }
}
</style>