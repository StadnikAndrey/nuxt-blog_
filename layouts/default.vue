<template>
  <transition name="transition_content">
    <div class="wrap-page">
      <header class="header">
        <div class="content">
          <div class="header__inner">
            <NuxtLink class="header__logo" to="/"> Blog </NuxtLink>
            <nav class="header__menu">
              <NuxtLink
                class="header__menu-item"
                v-for="item of menu"
                :key="item.txt"
                :to="item.href"
                >{{ item.txt }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>
      <Nuxt />
      <footer class="footer">
        <div class="content"><div class="footer__inner">&copy; 2023</div></div>
      </footer>
      <Notifications />
    </div>
  </transition>
</template>

<script>
import menu from "~/assets/data-files/menu.json";
import Notifications from "@/components/Notifications.vue";

export default {
  components: {
    Notifications,
  },
  data() {
    return {
      menu: menu,
    };
  },
};
</script>

<style lang="scss">
.wrap-page {
  min-height: 100vh;
}
.header {
  padding: 12px 0;
  border-bottom: 1px solid #ececec;
  &__logo {
    font-weight: bolder;
    font-size: 25px;
  }
  &__inner {
    display: flex;
    align-items: baseline;
    gap: 25px;
  }
  &__menu {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  &__menu-item {
    font-weight: bold;
    font-size: 16px;
  }
}
.main {
  padding: 25px 0 60px 0;
}
.footer {
  position: sticky;
  top: 100vh;
  background-color: #0057ff;
  color: #fff;
  padding: 12px 0;
}
</style>