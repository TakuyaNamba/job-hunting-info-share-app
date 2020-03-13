<template>
  <v-app>
    <v-app-bar app color="blue darken-2" dark>
      <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>就活生情報共有プラットホーム</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'User_edit', params: { user_id: $store.getters.uid } }">
          <v-icon v-if="$store.state.login_user" class="mx-2">mdi-account</v-icon>
      </router-link>
      <router-link :to="{ name: 'Companies' }">
          <v-icon v-if="$store.state.login_user" class="mx-2">mdi-home</v-icon>
      </router-link>
      <v-icon v-if="$store.state.login_user" class="mx-2" @click="logout">mdi-logout</v-icon>
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
        if (this.$router.currentRoute.name === 'Home') this.$router.push({ name: 'User_begin'}, () => {})
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
    ...mapActions(['toggleSideMenu','setLoginUser','logout','deleteLoginUser'])
  }
};
</script>
