<template>
  <client-only>
    <div class="notifications">
      <div class="notifications__item" v-for="item of notifications" :key="item.id">
        {{ item }}
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notifications",
  data() {
    return {};
  },

  computed: {
    ...mapGetters({ notifications: "notifications/notifications" }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;

  &__item {
    max-width: 600px;
    padding: 8px 15px;
    border-radius: 5px;
    background-color: rgba(#fc3c2d, 0.5);
    color: #042d5b;
    margin-bottom: 10px;
    font-weight: bold;
  }
}
</style>