<template>
  <transition name="page">
    <div v-show="articles != null">
      <h3>All articles</h3>
      <div class="wrap-table">
        <table class="table">
          <thead class="t-head-fixed">
            <tr>
              <th scope="row">№</th>
              <th>id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date of creation</th>
              <th>Display</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in articles" :key="article.id">
              <td scope="row">{{ ++index }}</td>
              <td>
                <nuxt-link class="admin-articles__link-update" :to="`/${article.id}`">{{ article.id }}</nuxt-link>
              </td>
              <td>
                <nuxt-link class="admin-articles__link-update"
                  :to="`adminpanel/articles/update-article/${article.id}`">{{ article.head.title }}</nuxt-link>
              </td>
              <td>{{ article.author }}</td>
              <td>{{ article.date_add }}</td>
              <td class="utd-align-center">
                <input type="checkbox" :checked="article.display == 1 ? true : false" @change="
                  toggleDisplayArticle(article.id, Number(article.display))
                  " v-model="article.display" />
              </td>
              <td class="utd-align-center">
                <button class="table__icon-del" type="button" @click="deleteArticle(article.id)">
                  &#215;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { notifications } from "~/mixins/index.js";
export default {
  name: "AdminpanelIndex",
  mixins: [notifications],
  data() {
    return {
      articles: null,
    };
  },
  async mounted() {
    this.getArticles();
  },
  computed: {
    ...mapGetters({ user: "user/getUser" }),
  },
  methods: {
    async getArticles() {
      if (this.user != null) {
        let res = await this.$axios
          .$get(`/api/articles-admin`)
          .catch((error) => {
            this.notificationsAdd("Error get all articles for adminpanel");
          });
        if (res != undefined && res?.ok) {
          this.articles = res.data;
        }
      }
    },
    async toggleDisplayArticle(id, value) {
      if (this.user != null) {
        let res = await this.$axios
          .$post(`/api/article-display`, { id: id, display: value })
          .catch((error) => {
            this.notificationsAdd("Error toggle article display");
          });
        if (res != undefined && res?.ok) {
          this.getArticles();
        }
      }
    },
    async deleteArticle(id) {
      if (this.user != null) {
        let res = await this.$axios
          .$put(`/api/article-delete`, { id: id })
          .catch((error) => {
            this.notificationsAdd("Error delete article");
          });
        if (res != undefined && res?.ok) {
          this.getArticles();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/table.scss";

.admin-articles {
  &__link-update {
    text-decoration: underline 2px solid;
  }
}
</style>