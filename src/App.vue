<template>
  <v-app>
    <v-app-bar app color="blue darken-2" dark>
      <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>就活生情報共有プラットホーム</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="$store.state.login_user">
        <v-icon @click="logout">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <SideNav/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import SideNav from './components/SideNav'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SideNav
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.fetchCompanies()
        if (this.$router.currentRoute.name === 'Home') this.$router.push({ name: 'Companies'}, () => {})
      } else {
        this.deleteLoginUser()
        this.$router.push({ name: 'Home' }, () => {})
      }
    })
  },
  data: () => ({
    //
  }),
  methods : {
    ...mapActions(['toggleSideMenu','setLoginUser','logout','deleteLoginUser','fetchCompanies'])
  }
};
</script>
