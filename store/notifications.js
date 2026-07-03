
export const state = () => ({
  notifications: [],
  idNotifications: 0
})

export const getters = {
  notifications(state) {
    let res = [...state.notifications];
    return res.reverse();
  }
}

export const mutations = {
  notificationsAdd(state, data) {
    ++state.idNotifications
    state.notifications.push({ id: state.idNotifications, txt: data });
  },
  deleteNotification(state, { id }) {
    state.notifications = state.notifications.filter(msg => msg.id !== id);
  }
}

export const actions = {
  async notificationsAdd({ state, commit }, data) {
    commit("notificationsAdd", data);
    let { idNotifications } = state;
    let time = 2000 * (state.notifications.length + 1);
    await new Promise(resolve => setTimeout(resolve, time));
    commit("deleteNotification", { id: idNotifications });
  }
}