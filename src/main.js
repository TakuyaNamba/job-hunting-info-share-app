import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCMTpIw8L4i2kY8TI73QLLpkmM7y5_r5Ec",
  authDomain: "mission-new.firebaseapp.com",
  databaseURL: "https://mission-new.firebaseio.com",
  projectId: "mission-new",
  storageBucket: "mission-new.appspot.com",
  messagingSenderId: "889403657441",
  appId: "1:889403657441:web:3da08179a021e2b38dbba0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
