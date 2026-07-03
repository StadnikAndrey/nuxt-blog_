<template>
  <main class="main">
    <section v-if="article != null">
      <div class="article-head">
        <div class="content">
          <div
            class="article-head__inner"
            :style="{
              'background-image': 'url(' + `${article?.head?.bgImg}` + ')',
            }"
          >
            <div class="article-head__content">
              <div class="article-head__title-wrap">
                <h1 class="article-head__title">
                  {{ article.head?.title }}
                </h1>
              </div>
              <div class="article-head__meta">
                <p class="article-head__category">
                  {{ article?.head?.subtitle }}
                </p>
                <p class="article-head__data">
                  {{ createViewDateArticle(article.date_add) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="article-content">
        <div class="content">
          <div class="article-content__inner">
            <div class="article-content__body">
              <TypeText :contentStr="article?.body" v-if="article?.body" />
            </div>
            <aside class="article-content__aside">
              <div class="article-content__aside-top">
                <p>Lorem ipsum dolor sit amet.</p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Aperiam quas cumque nulla velit dolores at sequi amet ad
                  beatae, itaque reprehenderit impedit labore! Magnam facilis,
                  expedita ad, nemo perferendis cum atque corrupti temporibus
                  totam quia impedit minima asperiores animi, magni perspiciatis
                  at. Impedit perferendis qui iste. Neque qui reprehenderit
                  animi?
                </p>
              </div>
              <div class="article-content__aside-articles">
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem, ipsum dolor.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem ipsum dolor sit amet.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem ipsum dolor sit.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
                <a href="#" class="article-content__aside-articles-link">
                  <p class="article-content__aside-articles-title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                    quaerat unde laborum animi ipsam nisi adipisci veritatis
                    consequuntur! Commodi explicabo dicta sapiente totam harum
                    ut tempora ratione, libero nulla repudiandae.
                  </p>
                  <p class="article-content__aside-articles-data">
                    30 APR 2021
                  </p>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import VueHorizontal from "vue-horizontal";
import TypeCode from "~/components/TypeCode.vue";
import TypeText from "~/components/TypeText.vue";
import { transformData } from "~/mixins/index.js";
export default {
  name: "ArticlePage",
  transition: "transition_content",
  mixins: [transformData],
  components: {
    VueHorizontal,
    TypeCode,
    TypeText,
  },
  async asyncData(context) {
    let res = await context.$axios
      .$get(`/api/article?id=${context.route.params.article}`)
      .catch((error) => {
        context.error({
          statusCode: error.response.status,
          message: "Page not found",
        });
      });
    let article = null;
    if (res != undefined && res.ok) {
      article = res.data;
    }
    return { article };
  },
};
</script>

<style lang="scss">
.custom-horizontal {
  &__slide {
    // to display the img slider proportionally to the width
    width: 100%;
  }
}
</style>
