<template>
  <main class="main">
    <section class="blog-top">
      <div class="content">
        <div class="blog-top__inner">
          <div class="blog-top__item" v-for="item of articles" :key="item.id">
            <div class="blog-top__item-top">
              <img class="blog-top__item-img" :src="item.head.bgImg" alt="" />
            </div>
            <div class="blog-top__item-bottom">
              <div class="blog-top__item-bottom-head-wrap">
                <div class="blog-top__item-bottom-head">
                  <div class="blog-top__item-name">
                    <h3 class="blog-top__item-title">
                      {{ item.head.title }}
                    </h3>
                    <p class="blog-top__item-data">
                      {{ createViewDateArticle(item.date_add) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="blog-top__item-bottom-main">
                <p class="blog-top__item-subtitle">
                  {{ item.head.subtitle }}
                </p>
                <NuxtLink class="blog-top__item-link" :to="`/${item.id}`">MORE
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { notifications, transformData } from "~/mixins/index.js";
export default {
  name: "IndexPage",
  transition: "transition_content",
  mixins: [notifications, transformData],
  mounted() {
    if (this.articles == null) {
      this.notificationsAdd("Error get all articles");
    }
  },
  async asyncData(context) {
    let res = await context.$axios.$get(`/api/articles`).catch((error) => { });
    let articles = null;
    if (res != undefined && res.ok == true) {
      articles = res.data;
    }
    return { articles };
  },
};
</script>