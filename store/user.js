import * as token from '../utils/tokens.js'

let autoLoginResolver;
let autoLoginPromise = new Promise(resolve => { autoLoginResolver = resolve });

export const state = () => ({
  user: null,
  errorsLogin: [],
  checkLogin: 0,
})

export const getters = {
  getUser(state) {
    return state.user;
  },
  getErrorsLogin(state) {
    return state.errorsLogin;
  },
  ready: () => autoLoginPromise,
  checkLogin(state) {
    return state.checkLogin;
  },
}

export const mutations = {
  setErrorsLogin(state, data) {
    state.errorsLogin = data;
  },
  setUser(state, data) {
    state.user = data;
  },
  checkLogin(state, data) {
    state.checkLogin = data;
  },
}

export const actions = {
  async login({ commit, dispatch }, formdata) {
    let res = await this.$axios.$post('/api/login', formdata);
    if (res) {
      if (res.ok == true) {
        dispatch('setErrorsLogin', []);

        token.setAccessToken(res.data);
        let user = token.getJWTPayload(res.data);
        commit('setUser', user);
      } else {
        dispatch('setErrorsLogin', res.errors);
        if (res.errors[0] == null) {
          dispatch('setErrorsLogin', ['database connection error']);
        }
      }
      return res.ok;
    }
  },
  setErrorsLogin({ commit }, data) {
    commit('setErrorsLogin', data);
  },
  async autoLogin({ commit, dispatch }) {
    let at = token.getAccessToken();
    if (at != null) {
      let data = await this.$axios.$get('/api/check').catch((error) => {
        if (error.response.status >= 500) {
          dispatch("notifications/notificationsAdd", `Server error with code ${error.response.status} on autologin`, { root: true });
        }
      });
      if (data && data.ok == true && data.data != undefined) {
        let user = token.getJWTPayload(data.data);
        commit('setUser', user);
      } else if (data && data.ok == false) {
        commit('setUser', null);
        token.cleanAccessTokensData();
      }
    }
    autoLoginResolver();
  },
}