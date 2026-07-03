<template>
  <div>
    <Nuxt />
    <Notifications />
  </div>
</template>

<script>
import { authFalse } from "~/mixins/index.js";
import Notifications from "@/components/Notifications.vue"
export default {
  mixins: [authFalse],
  components: {
    Notifications
  }
};
</script>