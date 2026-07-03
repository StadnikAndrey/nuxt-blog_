<template>
  <client-only>
    <main>
      <div class="content">
        <div>{{ user }}</div>
        <div class="adminpanel__head">
          <h6>ADMINPANEL</h6>
          <div class="adminpanel__wrap-btn-logout">
            <button class="adminpanel__btn-logout" type="button" @click="logout">
              sign out
            </button>
            <button class="adminpanel__btn-logout" type="button" @click="logoutAllDevices">
              sign out on all devices
            </button>
          </div>
        </div>
        <div class="adminpanel__inner">
          <div class="adminpanel__menu">
            <nav class="adminpanel__nav">
              <div class="adminpanel__nav-section" v-for="(section, ind) in menu" :key="ind">
                <p class="adminpanel__nav-section-title">{{ section.title }}</p>
                <NuxtLink v-for="(link, ind) in section.links" :key="ind" class="adminpanel__nav-link" :to="link.href"
                  active-class="adminpanel__nav-link--activ" exact>
                  {{ link.txt }}
                </NuxtLink>
              </div>
            </nav>
          </div>
          <div class="adminpanel__content">
            <NuxtChild />
          </div>
        </div>
      </div>
    </main>
  </client-only>
</template>

<script>
import { mapGetters } from "vuex";
import { notifications } from "~/mixins/index.js";
import * as token from "@/utils/tokens.js";
import "@/assets/css/form.scss";
export default {
  name: "AdminpanelParentPage",
  layout: "adminpanel",
  mixins: [notifications],
  data() {
    return {
      menu: [
        {
          title: "Articles",
          links: [
            {
              txt: "All articles",
              href: "/adminpanel",
            },
            {
              txt: "Add article",
              href: "/adminpanel/articles/add-article",
            },
          ],
        },
        {
          title: "Users",
          links: [
            {
              txt: "All users",
              href: "/adminpanel/users",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ user: "user/getUser" }),
  },
  methods: {
    async logout() {
      if (this.user != null) {
        let logout = await this.$axios
          .$post("/api/logout", {
            id: this.user?.id,
            id_session: this.user?.id_session,
          })
          .catch((e) => {
            this.notificationsAdd(`Error logout. ${e.response.status}`);
          });
        if (logout != undefined && logout?.ok) {
          this.$store.commit("user/setUser", null);
          token.cleanAccessTokensData();
          this.$router.push("/");
        }
      }
    },
    async logoutAllDevices() {
      if (this.user != null) {
        let logout = await this.$axios
          .$post("/api/logout-all-devices", {
            id: this.user?.id,
          })
          .catch((e) => {
            this.notificationsAdd(
              `Error logout on all devices. ${e.response.status}`
            );
          });
        if (logout != undefined && logout?.ok) {
          this.$store.commit("user/setUser", null);
          token.cleanAccessTokensData();
          this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style lang="scss">
.adminpanel {
  &__head {
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
  }

  &__wrap-btn-logout {
    display: flex;
    gap: 25px;
  }

  &__btn-logout {
    text-decoration: underline;
  }

  &__inner {
    display: flex;
    gap: 10px;
    padding: 20px 0;
  }

  &__menu {
    border: 1px solid;
    width: calc(25% - 5px);
  }

  &__content {
    border: 1px solid green;
    width: calc(75% - 5px);
  }

  &__nav-section {
    padding-bottom: 20px;
  }

  &__nav-section-title {
    color: #212121;
    font-weight: bold;
  }

  &__nav-link {
    display: block;
    padding: 6px 0 6px 8px;

    &:hover {
      background-color: #f1f1f1;
    }

    &--activ {
      background-color: #f1f1f1;
    }
  }
}
</style>