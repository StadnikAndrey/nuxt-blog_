<template>
  <client-only>
    <div class="login">
      <div class="login__content" v-if="user == null">
        <h2 class="login__title">Sign up</h2>
        <form class="login__form" autocomplete="off">
          <div class="login__form-row">
            <label class="login__form-label">Email</label>
            <input class="login__form-input login__form-input-user" type="text" placeholder="Email"
              v-model="form.email" />
          </div>
          <div class="login__form-row">
            <label class="login__form-label">Password</label>
            <input class="login__form-input login__form-input-password" type="password" placeholder="Password"
              v-model="form.password" />
          </div>

          <button class="login__btn" type="button" @click="signUp">
            Sign up
          </button>
        </form>
        <div class="login__server-errors">
          <p v-for="error in serverErrors" :key="error">{{ error }}</p>
        </div>
        <div class="login__go-site">
          <NuxtLink class="login__go-site-link" :to="'/sign-in'">
            Sign in
          </NuxtLink>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from "vuex";
import { notifications } from "~/mixins/index.js";
export default {
  name: "SignUp",
  layout: "empty",
  mixins: [notifications],
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      serverErrors: [],
    };
  },
  computed: {
    ...mapGetters({ user: "user/getUser" }),
  },
  methods: {
    async signUp() {
      let res = await this.$axios
        .$post("/api/registration", this.form)
        .catch((e) => {
          this.notificationsAdd(`${e} error`);
        });
      if (res) {
        if (res.ok == true) {
          this.serverErrors = [];
          this.$router.push("/sign-in");
        } else {
          this.serverErrors = res.errors;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/vars.scss";

.login {
  width: 100vw;
  height: 100vh;
  padding: 135px 15px 25px;
  overflow-y: auto;

  &__content {
    width: 100%;
    max-width: 328px;
    margin: 0 auto;
  }

  &__title {
    font-size: 25px;
    margin-bottom: 20px;
  }

  &__form {
    margin-bottom: 33px;
  }

  &__form-row {
    margin-bottom: 32px;
  }

  &__form-label {
    display: block;
    font-family: "GT-Eesti-Pro-Text-light";
    font-size: 15px;
    color: #12162d;
    margin: 0 0 8px 4px;
  }

  &__form-input {
    width: 100%;
    background-color: inherit;
    padding: 10.5px 15px 10.5px 50px;
    outline: none;
    border: 1.28px solid #12162d;
    border-radius: 5px;
    color: #12162d;
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: auto;

    &::placeholder {
      color: rgba(#12162d, 0.5);
      font-size: 17px;
    }
  }

  &__form-input-user {
    background-image: url(~/assets/img/login-user-1.svg);
  }

  &__form-input-password {
    background-image: url(~/assets/img/login-password-1.svg);
  }

  &__forgot-pass-link {
    display: inline-block;
    font-family: "GT-Eesti-Pro-Text-light";
    font-size: 12px;
    color: $black30;
    margin: 6px 0 0 4px;
  }

  &__btn {
    font-family: "GT-Eesti-Pro-Text";
    font-size: 17px;
    width: 100%;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 12px;
    text-transform: uppercase;
  }

  &__go-site {
    font-family: "GT-Eesti-Pro-Text-light";
    font-size: 15px;
    line-height: 1.3;
    padding-left: 4px;
  }

  &__go-site-link {
    color: #12162d;
  }

  &__server-errors {
    color: red;
    margin-bottom: 10px;
  }
}
</style>