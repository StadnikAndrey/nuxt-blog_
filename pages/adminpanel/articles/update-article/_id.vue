<template>
  <client-only>
    <div>
      <h3 class="article-add__title">
        Update article: {{ article.head.title.value }}
      </h3>
      <button class="article-add__btn-rules-create" type="button" @click="activRules = true">
        how to create an article?
      </button>
      <Dialog :active="activRules" @active="activRules = false">
        <Rules />
      </Dialog>

      <div class="article-add__section">
        <h5 class="article-add__section-title">CRUD assets:</h5>
        <div class="article-add__crud">
          <button class="article-add__crud-btn" type="button" @click="activCrudImg = true">
            images
          </button>
        </div>
        <Dialog :active="activCrudImg" @active="activCrudImg = false">
          <CRUDimg v-if="activCrudImg" />
        </Dialog>
      </div>

      <form>
        <div class="form__row" v-for="(item, index) of article.head" :key="index">
          <label class="form__label">{{ item.label }}</label>
          <input class="form__input" v-model.trim="item.value" type="text" :placeholder="item.plaseholder" />
        </div>
      </form>

      <div class="article-add__section">
        <h5 class="article-add__section-title">Components article:</h5>
        <div class="article-add__components">
          <button class="article-add__components-btn" type="button" @click="activCreateCode = true">
            Code
          </button>
          <button class="article-add__components-btn" type="button" @click="activCreateCarousel = true">
            Carousel
          </button>
          <button class="article-add__components-btn" type="button" @click="activCreateTooltip = true">
            Tooltip
          </button>
          <button class="article-add__components-btn" type="button" @click="activCreateAccordeon = true">
            Accordeon
          </button>
          <button class="article-add__components-btn" type="button" @click="activCreateVideo = true">
            Video
          </button>
        </div>
        <Dialog :active="activCreateCode" @active="activCreateCode = false">
          <TypeCodeCreate v-if="activCreateCode" />
        </Dialog>
        <Dialog :active="activCreateCarousel" @active="activCreateCarousel = false">
          <CarouselCreate v-if="activCreateCarousel" />
        </Dialog>
        <Dialog :active="activCreateTooltip" @active="activCreateTooltip = false">
          <TooltipCreate v-if="activCreateTooltip" />
        </Dialog>
        <Dialog :active="activCreateAccordeon" @active="activCreateAccordeon = false">
          <AccordeonCreate v-if="activCreateAccordeon" />
        </Dialog>
        <Dialog :active="activCreateVideo" @active="activCreateVideo = false">
          <TypeVideoCreate v-if="activCreateVideo" />
        </Dialog>
      </div>

      <div class="article-add__section">
        <h5 class="article-add__section-title">Article body</h5>
        <client-only>
          <ckeditor v-if="editor" :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
        </client-only>
        <button class="article-add__btn-create article-update__btn-update" type="button" @click="updateArticle"
          :disabled="article.id == null">
          Update article
        </button>
      </div>

      <div style="background: aqua">{{ htmlDecode }}</div>

      <div class="article-add__preview">
        <div class="article-head__inner" :style="{ backgroundImage: `url(${article.head.bgImg.value})` }">
          <div class="article-head__content">
            <div class="article-head__title-wrap">
              <h1 class="article-head__title">
                {{ article.head.title.value }}
              </h1>
            </div>
            <div class="article-head__meta">
              <p class="article-head__category">
                {{ article.head.subtitle.value }}
              </p>
              <p class="article-head__data">
                {{ createViewDateArticle() }}
              </p>
            </div>
          </div>
        </div>

        <div class="article-add__preview-body-wrap article-content__body">
          <TypeText :contentStr="article.body" v-if="article.body" />
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { notifications, transformData } from "~/mixins/index.js";
import TypeText from "@/components/TypeText.vue";
import Dialog from "@/components/Dialog.vue";
import Rules from "@/components/RulesCreateArticle.vue";
import TypeCodeCreate from "@/components/TypeCodeCreate.vue";
import CRUDimg from "@/components/CRUDimg.vue";
import TypeVideoCreate from "@/components/TypeVideoCreate.vue";
import TooltipCreate from "@/components/TooltipCreate.vue";
import CarouselCreate from "@/components/CarouselCreate.vue";
import AccordeonCreate from "@/components/AccordeonCreate.vue";

let editor;
let CKEditor;
if (process.client) {
  try {
    editor = require("@/assets/ckeditor5/build/ckeditor");
    CKEditor = require("@ckeditor/ckeditor5-vue2");
  } catch (error) {
    console.log(error);
  }
} else {
  CKEditor = { component: { template: "<div></div>" } };
}

export default {
  name: "AddArticle",
  mixins: [notifications, transformData],
  components: {
    TypeText,
    Dialog,
    Rules,
    TypeCodeCreate,
    CRUDimg,
    TypeVideoCreate,
    TooltipCreate,
    CarouselCreate,
    AccordeonCreate,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: editor,
      content: ``,
      editorConfig: {
        htmlSupport: {
          allow: [
            {
              name: /.*/,
              attributes: true,
              classes: true,
              styles: true,
            },
          ],
        },
        mediaEmbed: {
          previewsInData: true,
        },
        heading: {
          options: [
            {
              model: "component",
              view: "component",
              title: "component",
              class: "",
            },
            {
              model: "span",
              view: "span",
              title: "span",
              class: "",
            },
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
          ],
        },
      },
      article: {
        id: null,
        head: {
          title: {
            label: "Title",
            plaseholder: "create title article",
            value: "",
          },
          subtitle: {
            label: "Subtitle",
            plaseholder: "create subtitle article",
            value: "",
          },
          bgImg: {
            label: "Article head image",
            plaseholder: "article head image link",
            value: "/placeholder-bg-head-article.jpg",
          },
        },
        body: this.htmlDecode,
      },
      activRules: false,
      activCrudImg: false,
      activCreateCode: false,
      activCreateCarousel: false,
      activCreateTooltip: false,
      activCreateAccordeon: false,
      activCreateVideo: false,
    };
  },
  mounted() {
    this.getArticle();
  },
  watch: {
    htmlDecode() {
      this.article.body = this.htmlDecode;
    },
  },
  computed: {
    htmlDecode() {
      return this.content;
    },
  },
  methods: {
    async getArticle() {
      let res = await this.$axios
        .$post(`/api/get-article`, { id: this.$route.params.id })
        .catch((error) => {
          this.notificationsAdd("Error get article for update");
          this.$nuxt.error({
            statusCode: error.response.status,
            message: "Page not found",
          });
        });
      if (res != undefined && res?.ok) {
        this.article.id = res.data.id;
        this.article.head.title.value = res.data.head.title;
        this.article.head.subtitle.value = res.data.head.subtitle;
        this.article.head.bgImg.value = res.data.head.bgImg;

        this.content = res.data.body == null ? "" : res.data.body;
      }
    },
    async updateArticle() {
      let article = {
        id: this.article.id,
        head: {
          title: this.article.head.title.value,
          subtitle: this.article.head.subtitle.value,
          bgImg: this.article.head.bgImg.value,
        },
        body: this.article.body,
      };
      let res = await this.$axios
        .$put("/api/update-article", article)
        .catch((e) => {
          this.notificationsAdd(`Error update article. ${e.response.status}`);
        });
      if (res?.ok) {
        this.$router.push(`/${this.article.id}`);
      } else if (!res?.ok) {
        this.notificationsAdd(res.errors);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article-add {
  &__title {
    font-weight: bold;
  }

  &__btn-rules-create {
    margin-bottom: 20px;
    font-size: 16px;
    color: blue;
    text-decoration: 1px solid underline;
  }

  &__preview-body-wrap {
    padding-top: 30px;
  }

  &__section {
    margin-bottom: 25px;
  }

  &__section-title {
    font-family: "GT-Eesti-Pro-Text";
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__components {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__components-btn {
    padding: 5px 8px;
    background-color: lightblue;
    border-radius: 7px;
  }

  &__crud {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  &__crud-btn {
    padding: 5px 8px;
    background-color: rgb(173, 230, 183);
    border-radius: 7px;
  }

  &__btn-create {
    margin-top: 25px;
    background-color: #ff731d;
    padding: 5px 10px;
    color: #fff;
    border-radius: 5px;
    text-transform: uppercase;
  }
}

.article-update {
  &__btn-update {
    background-color: #000;
    border-radius: 0;

    &:disabled {
      opacity: 0.5;

      &:hover {
        cursor: auto;
      }
    }
  }
}
</style>