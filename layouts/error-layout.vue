<template>
  <div>
    <Nuxt />
    <Notifications />
  </div>
</template>

<script>
import Notifications from "@/components/Notifications.vue"
export default {
  components: {
    Notifications
  }
};
</script>