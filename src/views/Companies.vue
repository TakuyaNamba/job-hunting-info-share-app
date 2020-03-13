<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <h1>会社情報一覧表示画面</h1>
            </v-flex>
            <v-flex xs12 text-right>
                <router-link :to="{ name: 'Company_edit' }">
                    <v-btn color="info">新規会社情報追加</v-btn>
                </router-link>
            </v-flex>
            <v-flex justify-center>
                <v-data-table :headers='headers' :items='companies'>
                    <template v-slot:item.detail="{ item }">
                        <router-link :to="{ name: 'Company_reviews', params: { company_id: item.id }}">
                        <v-icon small class="mr-2">mdi-magnify</v-icon>
                        </router-link>
                        <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
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
    this.resetStateCompanies()
    this.fetchCompanies()
    this.companies = this.$store.state.companies
  },
  data () {
    return {
      headers: [
        { text: '会社名', align: 'center', value: 'companyname' },
        { text: 'レビュー数', align: 'center', value: 'review_size' },
        { text: '操作', align: 'center', value: 'detail' },
      ],
      companies: []
    }
  },
  methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteCompany({ id })
      }
    },
    ...mapActions(['fetchCompanies','resetStateCompanies','countCollection','deleteCompany','getUser'])
  }
}
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>