export default {
  async middleware({ store, redirect }) {
    if (process.client && store.getters["user/getUser"] == null) {
      console.log('middleware true');
      store.commit("user/checkLogin", 1);
      return redirect("/sign-in");
    }
  },
  async mounted() {
    if (this.$store.getters["user/checkLogin"] == 0 && this.$store.getters["user/getUser"] == null) {
      console.log('mounted true');
      window.location.href = "/sign-in";
    }
  },
  destroyed() {
    this.$store.commit("user/checkLogin", 0);
  }
}