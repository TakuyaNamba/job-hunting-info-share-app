import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    companies: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    addCompany (state, { id, company }) {
      company.id = id
      state.companies.push(company)
    },
    updateCompany (state, { id, company }) {
      const index = state.companies.findIndex(company => company.id === id)

      state.companies[index] = company
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    fetchCompanies ({ commit }) {
      firebase.firestore().collection(`companies`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addCompany', { id: doc.id, company: doc.data() }))
      })
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout() {
      firebase.auth().signOut()
    },
    deleteLoginUser ( { commit }) {
      commit('deleteLoginUser')
    },
    addCompany ( { getters, commit }, company) {
      if (getters.uid) {
        firebase.firestore().collection(`users`).doc(getters.uid).set({
          name: getters.userName,
          address: getters.email
        })
        firebase.firestore().collection(`companies/${company.companyname}/reviews`).doc(getters.uid).set({
          name: company.name,
          companyname: company.companyname,
          info: company.info,
          uid: getters.uid
        }).then(doc => {
          commit('addCompany', { id: doc.id, company })
        })
      }
    },
    updateCompany ({ getters, commit }, { id, company }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies`).doc(id).update(company).then(() => {
          commit('updateCompany', { id, company })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    email: state => state.login_user ? state.login_user.email : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getCompanyById: state => id => state.companies.find(company => company.id === id)
  }
})
