<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 text-right>
                <router-link :to="{ name: 'Company_edit' }">
                    <v-btn color="info">新規会社情報追加</v-btn>
                </router-link>
            </v-flex>
            <v-flex justify-center>
                <v-data-table :headers='headers' :items='companies'>
                    <template v-slot:item.action="{ item }">
                        <router-link :to="{ name: 'Company_edit', params: { company_id: item.id }}">
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                        </router-link>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  created () {
    this.companies = this.$store.state.companies
  },
  data () {
    return {
      headers: [
        { text: '投稿者', align: 'center', value: 'name' },
        { text: '会社名', align: 'center', value: 'companyname' },
        { text: '情報', align: 'center', value: 'info' },
        { text: '操作', align: 'center', value: 'action', sortable: false },
        { text: '詳細表示', align: 'center', value: 'detail', sortable: false }
      ],
      companies: []
    }
  }
}
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>