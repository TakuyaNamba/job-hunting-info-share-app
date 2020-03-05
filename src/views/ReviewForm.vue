<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>新規レビュー追加</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="review.name" label="投稿者" disabled="true"></v-text-field>
               <v-text-field v-model="review.companyname" label="会社名" disabled="true"></v-text-field>
               <v-text-field v-model="review.info" label="情報"></v-text-field>
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
  created () {
    this.review.name = this.$store.getters.userName
    this.review.companyname = this.$route.params.company_id
    if (!this.$route.params.review_id) return
    const review = this.$store.getters.getReviewById(this.$route.params.review_id)
    if (review) {
      this.review = review
    } else {
      this.$router.push({ name: 'Company_reviews' })
    }
  },
  data () {
    return {
      review: {}
    }
  },
  methods: {
      submit () {
        if (this.$route.params.review_id) {
        this.updateReview({ id: this.$route.params.review_id, review: this.review })
      } else {
        this.addReview(this.review)
      }
        this.$router.push({ name: 'Company_reviews' })
        this.review = {}
    },
    ...mapActions(['addReview','updateReview'])
  }
}
</script>