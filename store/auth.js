export const state = () => ({
  user: {},
  isAuth: false,
})

export const mutations = {
  setAuth(state, data) {
    state.user = data.user;
    state.isAuth = true
  },
  removeAuth(state) {
    state.user = {};
    state.isAuth = false
  }
}

export const actions = {
  async loadUser({commit}) {
    if (typeof window !== 'undefined') {
      await this.$axios.$get(`/auth/user`)
      .then((resp) => {
        if(resp.success == true) {
          commit('setAuth', resp.data)
        } else {
          commit('removeAuth')
        }
      }).catch(() => {})
    }
  },
  async logout({commit}) {
    if (typeof window !== 'undefined') {
      commit('removeAuth')
      localStorage.removeItem('token')
    }
  }
}