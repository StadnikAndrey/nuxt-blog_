<template>
  <div>
    <h1>All users</h1>
    <div class="wrap-table" v-if="users">
      <table class="table">
        <thead class="t-head-fixed">
          <tr>
            <th scope="row">№</th>
            <th>id</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Is ban</th>
            <th>Date add</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td scope="row">{{ ++index }}</td>
            <td>{{ user.id }}</td>
            <td>
              {{ user.email }}
            </td>
            <td>{{ user.roles }}</td>
            <td>{{ user.is_ban }}</td>
            <td>{{ user.date_add }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { notifications } from "~/mixins/index.js";
export default {
  name: "AdminpanelUsers",
  mixins: [notifications],
  data() {
    return {
      users: null,
      user: null,
    };
  },
  computed: {
    ...mapGetters({ getterUser: "user/getUser" }),
  },
  async mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      let res = await this.$axios.$get("/api/users").catch((e) => {
        this.notificationsAdd(`Error get users. ${e.response.status}`);
      });
      if (res != undefined && res?.ok) {
        this.users = res.data;
      } else if (res != undefined && !res?.ok) {
        this.notificationsAdd(res);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/table.scss";
</style>