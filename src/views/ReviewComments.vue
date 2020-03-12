<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
       <v-flex xs5 mt-5>
            <v-card tile>
              <v-toolbar flat color="grey" dark>
                <v-toolbar-title>レビュー詳細画面</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-avatar>
                  <v-img v-if="review.photoURL" :src="review.photoURL"></v-img>
                </v-avatar>
              </v-toolbar>
              <v-row align="start" no-gutters>
                <v-col align="end" cols="12">
                  <v-list-item>
                      <v-list-item-content>
                      <v-list-item-title class="title">{{ review.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ review.university }}</v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col align="center" justify="center" cols="12">
                  <v-card-text>
                    <v-text-field filled label="会社名" v-model="review.companyname"></v-text-field>
                    <v-textarea filled auto-grow label="会社情報" v-model="review.info"></v-textarea>
                  </v-card-text>
                </v-col>
                <v-col cols="12">
                  <v-subheader>コメント一覧</v-subheader>
                  <v-list two-line>
                    <v-list-item v-for="item in comments" v-bind:key="item.photoURL">
                      <v-list-item-avatar>
                        <v-img :src="item.photoURL"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.info"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12">
                  <v-textarea outlined rounded filled auto-grow label="コメント" v-model="comment.info" rows="1"></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center" cols="6">
                  <v-btn @click="$router.push({ name: 'Companies' })">もっと見る</v-btn>
                </v-col>
                <v-col align="center" cols="6">
                  <v-btn color="info" @click="submit">コメント投稿</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.resetStateComments()
    this.fetchComments({company_id: this.$route.params.company_id, review_id: this.$route.params.review_id})
    this.comments = this.$store.state.comments
    this.review.companyname = this.$route.params.company_id
    
    if (!this.$route.params.review_id) return
    const review = this.$store.getters.getReviewById(this.$route.params.review_id)
    if (review) {
      this.review = review
    } else {
      this.$router.push({ name: 'Company_reviews' })
    }
    this.comment.reviewer = this.review.name
    this.comment.photoURL = this.$store.getters.photoURL
    this.comment.name = this.$store.getters.userName
    this.comment.companyname = this.review.companyname
  },
  data () {
    return {
      headers: [
        { text: '会社名', align: 'center', value: 'companyname' },
      ],
      review: {},
      comment: {},
      comments: {}
    }
  },
  methods: {
    submit () {
        this.addComment(this.comment)
        this.$router.push({ name: 'Review_comments', params: {company_id: this.review.companyname, review_id: this.comment.reviewer } })
        this.comment.info = null
    },
    ...mapActions(['addReview','updateReview','addComment','fetchComments','resetStateComments'])
  }
}
</script>