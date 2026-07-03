<template>
  <div class="create-video">
    <h1 class="create-video__title">Constructor video</h1>
    <div v-if="!errorServer">
      <div class="create-video__constructor">
        <h3 class="create-video__section-title">Constructor:</h3>
        <p class="create-video__section-subtitle">
          Paste the link to the video into the field, copy the result and paste
          it into the article in the editor. The link can be from external
          sources or get a link to the downloaded video by clicking on the copy
          button in the Video management section
        </p>
        <form>
          <div class="form__row">
            <label class="form__label">Link to video</label>
            <input class="form__input" type="text" v-model="src" @input="setTxtBtnCopyRes" />
          </div>
        </form>
        <div class="create-video__result">
          <button class="create-video__btn-copy-res" type="button" @click="copyRes">
            {{ txtBtnCopyRes }}
          </button>
          <div>{{ res }}</div>
        </div>
      </div>

      <div>
        <h3 class="create-video__section-title">Video management:</h3>
        <form class="create-video__form-upload">
          <div class="create-video__form-row">
            <label class="create-video__label" for="inpFileVideo" title="change video for upload server">+</label>
            <input id="inpFileVideo" class="create-video__form-upload-input" type="file" accept="video/*"
              @change="changeScreenshot($event)" ref="inpFile" />
          </div>
          <div class="form__screenshots-inner">
            <div class="form__screenshots-item" v-for="i of screenshots" :key="i.name">
              <button class="form__icon-del" type="button" @click="deleteScreenshot($event, i.name)">
                &#215;
              </button>
              <div>{{ i.name }}</div>
              <video :src="i.src" controls>
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </div>

          <button class="create-video__btn-img" type="button" v-if="uploadedVideo.length > 0"
            @click="uploadVideoOnServer($event)" :disabled="progressUpload">
            upload to server
          </button>
          <div class="create-video__progress-bar" :class="progressUpload ? 'create-video__progress-bar--activ' : ''">
          </div>
        </form>

        <div class="create-video__wrap-all-video" v-if="allVideo">
          <div class="create-video__video-item-wrap" v-for="item of allVideo" :key="item">
            <div>
              <button class="create-video__btn-copy-link" type="button" @click="copyNameСlipboard($event, item)">
                copy link
              </button>
              <video class="create-video__video-item" :src="`${$nuxt.$config.pathVideoServer}${item}`" controls>
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          </div>
        </div>

        <p class="create-video__tooltip-success-copie" :style="styleSuccessCopy">
          copied!
        </p>
      </div>
    </div>
    <p v-else>Impossible to work with video. Server error.</p>
  </div>
</template>

<script>
export default {
  name: "TypeVideoCreate",
  data() {
    return {
      allVideo: [],
      txtBtnCopyRes: "copy",
      src: "",
      uploadedVideo: [],
      screenshots: [],
      progressUpload: false,
      errorServer: false,
      styleSuccessCopy: {
        left: "-100%",
        top: 0,
      },
    };
  },
  created() {
    this.getVideo();
  },
  computed: {
    res() {
      let params = {
        COMPONENT: "typevideo",
        props: {
          src: this.src,
        },
      };
      let json = JSON.stringify(params);
      return json;
    },
  },
  methods: {
    async getVideo() {
      if (process.client) {
        let res = await this.$axios.$get("/api/all-video").catch((e) => {
          this.errorServer = true;
          console.log("error get all video", e);
        });
        if (res && res.ok) {
          this.errorServer = false;
          this.allVideo = res.data;
        } else if (res && res.ok == false) {
          this.errorServer = true;
        }
      }
    },
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
    changeScreenshot(e) {
      this.uploadedVideo = e.target.files;
      let video = [];
      for (const iterator of this.uploadedVideo) {
        let item = {
          name: iterator.name,
          src: URL.createObjectURL(iterator),
        };
        video.push(item);
      }
      this.screenshots = video;
    },
    deleteScreenshot($event, name) {
      let dt = new DataTransfer();
      for (var i = 0; i < this.uploadedVideo.length; i++) {
        if (this.uploadedVideo[i].name != name) {
          dt.items.add(this.uploadedVideo[i]);
        }
      }
      this.uploadedVideo = dt.files;
      let srcs = [];
      for (const iterator of this.uploadedVideo) {
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
    copyNameСlipboard(e, name) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(`${$nuxt.$config.pathVideoServer}${name}`)
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
    async uploadVideoOnServer(e, startByte = 0) {
      this.progressUpload = true;
      let sizeChunkFile = 100000000;
      let endByte = startByte + sizeChunkFile;
      let file = this.uploadedVideo[0];
      let chunk = file.slice(startByte, endByte);
      let sizeFile = file.size;
      let finish = endByte < sizeFile ? 0 : 1;
      let formData = new FormData();
      formData.append("finish", finish);
      formData.append("size", sizeFile);
      formData.append("offset", startByte);
      formData.append("chunk", chunk, file.name);
      let response = await this.$axios
        .$post("/api/add-video", formData)
        .catch((e) => {
          this.progressUpload = false;
          this.uploadedVideo = [];
          this.screenshots = [];
          this.errorServer = true;
          this.$refs["inpFile"].value = "";
          console.log("error upload big video on server ", e);
        });
      if (response && response.ok) {
        if (finish == 0 && response.data.bytes != undefined) {
          this.uploadVideoOnServer(e, response.data.bytes);
        } else {
          this.uploadedVideo = [];
          this.screenshots = [];
          this.getVideo();
          this.progressUpload = false;
          this.$refs["inpFile"].value = "";
        }
      } else if (response && response.ok == false) {
        this.progressUpload = false;
        this.errorServer = true;
        this.$refs["inpFile"].value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-video {
  width: 80vw;
  max-width: 1200px;

  &__title {
    font-size: 25px;
    margin-bottom: 25px;
    font-weight: bold;
  }

  &__constructor {
    margin-bottom: 20px;
  }

  &__section-title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__section-subtitle {
    margin-bottom: 10px;
  }

  &__btn-copy-res {
    background-color: green;
    padding: 2px 8px;
    color: #fff;
    border-radius: 5px;
  }

  &__form-upload {
    margin-bottom: 20px;
    border: 1px solid grey;
    padding: 10px;
  }

  &__label {
    font-size: 50px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
  }

  &__form-upload-input {
    display: none;
  }

  &__btn-img {
    background-color: #f9f7e8;
    color: #62bfad;
    font-weight: bolder;
    padding: 4px 8px;
    margin-bottom: 10px;

    &:disabled {
      opacity: 0.5;
    }
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

  &__wrap-all-video {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
  }

  &__video-item-wrap {
    max-width: calc(200px - 10px);
  }

  &__btn-copy-link {
    background-color: #acd;
    padding: 2px 5px;
    margin-bottom: 5px;
    border-radius: 5px;
  }

  &__video-item {
    max-width: 100%;
  }

  &__tooltip-success-copie {
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 2px 5px;
    position: absolute;
    transform: translateX(-50%) translateY(-100%);
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