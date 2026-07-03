// If the user is not logged in, access to the page is permitted.
// for pages: sign-in, sign-up
export default {
  async middleware({ store, redirect, req, from, app }) {
    if (process.client && store.getters["user/getUser"] != null) {
      console.log('middleware false');
      store.commit("user/checkLogin", 1);
      return redirect("/adminpanel");
    }
  },
  async mounted() {
    if (this.$store.getters["user/checkLogin"] == 0 && this.$store.getters["user/getUser"] != null) {
      console.log('mounted false');
      window.location.href = "/adminpanel";
    }
  },
  destroyed() {
    this.$store.commit("user/checkLogin", 0);
  }
}