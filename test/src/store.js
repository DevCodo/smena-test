import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const _baseUrl = 'http://localhost:8080';

export default new Vuex.Store({
  state: {
    processing: false,
    error: null,
    message: null,
    user: null,
    messageProfile: null,
  },
  getters: {
    processing: (state) => state.processing,
    error: (state) => state.error,
    message: (state) => state.message,
    user: (state) => state.user,
    messageProfile: (state) => state.messageProfile,
  },
  mutations: {
    setProcessing(state, param) {
      state.processing = param
    },
    setError(state, error) {
      state.error = error
    },
    setMessage(state, message) {
      state.message = message
    },
    setUser(state, data) {
      state.user = data
    },
    setMessageProfile(state, message) {
      state.messageProfile = message
    },
  },
  actions: {
    getAboutUser({commit}, token) {
      fetch(`${_baseUrl}/about/`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then((res) => {
        return res.json();
      }).then(({data, message}) => {
        if (data) {
          let user = data
          if (!user.about) user.about = "Какая-то информация"
          commit('setUser', user)
        } else {
          commit('setMessageProfile', message)
        }
      }).catch(() => {
        commit('setMessageProfile', "Не удалось получить информацию о пользователе, попробуйте позже")
      })
    },

    registration({commit}, data) {
      commit('setProcessing', true)
      fetch(`${_baseUrl}/register/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json();
      }).then(({error, message}) => {
        if (error) {
          commit('setError', error)
        } else {
          commit('setError', false)
          commit('setMessage', message)
        }
        commit('setProcessing', false)
      }).catch(() => {
        commit('setError', "Не удалось получиь доступ к системе, попробуйте позже")
        commit('setProcessing', false)
      })
    },

    login({commit, dispatch}, data) {
      commit('setProcessing', true)
      fetch(`${_baseUrl}/login/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
      }).then((res) => {
        return res.json();
      }).then(({error, token}) => {
        if (error) {
          commit('setError', error)
        } else {
          commit('setMessageProfile', null)
          commit('setError', null)
          dispatch('getAboutUser', token)
          localStorage.setItem('token', token)
          router.push('/')
        }
        commit('setProcessing', false)
      }).catch(() => {
        commit('setError', "Не удалось войти в систему, попробуйте позже")
        commit('setProcessing', false)
      })

    },
    
    logout({commit}) {
      router.push('/login')
      commit('setUser', null)
      localStorage.removeItem('token')
    }
  }
})
