import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    user: null,
    drawer: false,
    reviews: [],
    companies: [],
    comments: []
  },
  mutations: {
    getUser (state, info) {
      state.user = info
    },
    resetStateCompanies (state) {
      state.companies = []
    },
    resetStateReviews (state) {
      state.reviews = []
    },
    resetStateComments (state) {
      state.comments = []
    },
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    addCompany (state, { id, company }) {
      company.id = id
      state.companies.push(company)
    },
    updateCompany (state, { id, company }) {
      const index = state.companies.findIndex(company => company.id === id)

      state.companies[index] = company
    },
    addReview (state, { id, review }) {
      review.id = id
      state.reviews.push(review)
    },
    updateReview (state, { id, review }) {
      const index = state.reviews.findIndex(review => review.id === id)

      state.reviews[index] = review
    },
    addComment (state, { id, comment }) {
      comment.id = id
      state.comments.push(comment)
    },
    updateComment (state, { id, comment }) {
      const index = state.comments.findIndex(comment => comment.id === id)

      state.comments[index] = comment
    },
    deleteCompany (state, { id }) {
      const index = state.companies.findIndex(company => company.id === id)

      state.companies.splice(index, 1)
    },
    deleteReview (state, { id }) {
      const index = state.reviews.findIndex(review => review.id === id)

      state.reviews.splice(index, 1)
    },
    deleteComment (state, { id }) {
      const index = state.comments.findIndex(comment => comment.id === id)

      state.comments.splice(index, 1)
    }
  },
  actions: {
    getUser ( { getters, commit } ) {
      firebase.firestore().collection(`users`).doc(getters.uid).get().then(doc => {
        commit('getUser', { info: doc.data() })
      })
    },
    resetStateCompanies ({ commit }) {
      commit('resetStateCompanies')
    },
    resetStateReviews ({ commit }) {
      commit('resetStateReviews')
    },
    resetStateComments ({ commit }) {
      commit('resetStateComments')
    },
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    fetchCompanies ({ commit }) {
      firebase.firestore().collection(`companies`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addCompany', { id: doc.id, company: doc.data() }))
      })
    },
    fetchReviews ({ commit }, company_id) {
      firebase.firestore().collection(`companies/${company_id}/reviews`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addReview', { id: doc.id, review: doc.data() }))
      })
    },
    fetchComments ({ commit }, {company_id, review_id}) {
      firebase.firestore().collection(`companies/${company_id}/reviews/${review_id}/comments`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addComment', { id: doc.id, comment: doc.data() }))
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
    addUser ( { getters }, user) {
      if (getters.uid) {
        firebase.firestore().collection(`users`).doc(getters.uid).set({
          name: getters.userName,
          address: getters.email,
          university: user.university,
          grade: user.grade,
          major: user.major,
          uid: getters.uid
        })
      }
    },
    updateUser ( { getters }, user ) {
      firebase.firestore().collection(`users`).doc(getters.uid).update(user)
    },
    addCompany ( { getters, commit }, company) {
      firebase.firestore().collection(`companies`).doc(company.companyname).set({
        companyname: company.companyname,
        review_size: 0,
        uid: getters.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(doc => {
        commit('addCompany', { id: doc.id, company })
      })
    },
    updateCompany ({ commit }, { id, company }) {
      firebase.firestore().collection(`companies`).doc(id).update(company).then(() => {
        commit('updateCompany', { id, company })
      })
    },
    addReview ({ getters }, review ) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${review.companyname}/reviews`).add({
          name: review.name,
          companyname: review.companyname,
          info: review.info,
          uid: getters.uid,
          photoURL: getters.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        firebase.firestore().collection(`companies/${review.companyname}/reviews`).get().then( snap => {
          firebase.firestore().collection(`companies`).doc(review.companyname).update({review_size: snap.size }) 
        })
      }
    },
    updateReview ({ getters, commit }, { id, review }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${review.companyname}/reviews`).doc(id).update(review).then(() => {
          commit('updateReview', { id, review })
        })
      }
    },
    addComment ({ getters }, { company_id, review_id, comment } ) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${company_id}/reviews/${review_id}/comments`).add({
          name: comment.name,
          photoURL: comment.photoURL,
          companyname: company_id,
          info: comment.info,
          uid: getters.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }
    },
    updateComment ({ getters, commit }, { id, company_id, review_id, comment }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${company_id}/reviews/${review_id}/comments`).doc(id).update(comment).then(() => {
          commit('updateComment', { id, comment })
        })
      }
    },
    deleteCompany ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies`).doc(id).delete().then(() => {
          commit('deleteCompany', { id })
        })
      }
    },
    deleteReview ({ getters, commit }, { id, review }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${review.companyname}/reviews`).doc(id).delete().then(() => {
          firebase.firestore().collection(`companies/${review.companyname}/reviews`).get().then( snap => {
            firebase.firestore().collection(`companies`).doc(review.companyname).update({review_size: snap.size }) 
          })
          commit('deleteReview', { id })
        })
      }
    },
    deleteComment ({ getters, commit }, { id, company_id, review_id }) {
      if (getters.uid) {
        firebase.firestore().collection(`companies/${company_id}/reviews/${review_id}/comments`).doc(id).delete().then(() => {
          commit('deleteComment', { id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    email: state => state.login_user ? state.login_user.email : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getCompanyById: state => id => state.companies.find(company => company.id === id),
    getReviewById: state => id => state.reviews.find(review => review.id === id),
    getCommentById: state => id => state.comments.find(comment => comment.id === id)
  }
})
