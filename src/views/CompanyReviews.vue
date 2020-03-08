<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <h1>会社レビュー 一覧表示画面</h1>
            </v-flex>
            <v-flex xs12 text-right>
                <router-link :to="{ name: 'Review_edit', params: { company_id: $route.params.company_id } }">
                    <v-btn color="info">レビュー新規追加・変更</v-btn>
                </router-link>
            </v-flex>
            <v-flex justify-center>
                <v-data-table :headers='headers' :items='reviews'>
                    <template v-slot:item.info="{ item }">
                        {{ item.info.substring(0,10)+"..." }}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <router-link :to="{ name: 'Review_edit', params: { review_id: item.id }}">
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                        </router-link>
                    </template>
                    <template v-slot:item.detail="{ item }">
                        <router-link :to="{ name: 'Review_comments', params: { review_id: item.id }}">
                        <v-icon small class="mr-2">mdi-magnify</v-icon>
                        </router-link>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.fetchReviews(this.$route.params.company_id)
    this.reviews = this.$store.state.reviews
  },
  data () {
    return {
      headers: [
        { text: '投稿者', align: 'center', value: 'name' },
        { text: '情報', align: 'center', value: 'info' },
        { text: '操作', align: 'center', value: 'action', sortable: false },
        { text: '詳細表示', align: 'center', value: 'detail', sortable: false }
      ],
      reviews: []
    }
  },
  methods : {
    ...mapActions(['fetchReviews'])
  }
}
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>