<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>新規会社追加画面</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="company.companyname" label="会社名"></v-text-field>
               <div class="text-center">
                 <v-btn @click="$router.push({ name: 'Companies' })">キャンセル</v-btn>
                 <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
               </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      company: []
    }
  },
  methods: {
      submit () {
        this.addCompany(this.company)
        this.$router.push({ name: 'Companies' })
        this.company = []
    },
    ...mapActions(['addCompany'])
  }
}
</script>