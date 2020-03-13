<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>ホームページ</h1>
        <p>就活生情報共有プラットホームへようこそ</p>
      </v-flex>
      <v-flex xs12 text-right>
      <router-link :to="{ name: 'Companies'}">
      <v-btn color="info">会社一覧へ行く</v-btn>
      </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    
  }
}
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>