<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs5 mt-5>
            <v-card tile>
              <v-toolbar flat color="grey" dark>
                <v-toolbar-title>レビュー詳細画面</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-avatar>
                  <v-img v-if="photoURL" :src="photoURL"></v-img>
                </v-avatar>
              </v-toolbar>
              <v-row align="start" no-gutters>
                <v-col align="end" cols="12">
                  <v-list-item>
                      <v-list-item-content>
                      <v-list-item-title class="title">{{ userName }}</v-list-item-title>
                      <v-list-item-subtitle>{{ review.university }}</v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
                </v-col>
                  <v-col align="center" justify="center" cols="12">
                    <v-card-text>
                      <v-text-field filled label="会社名" v-model="review.companyname"></v-text-field>
                      <v-textarea filled label="会社情報" v-model="review.info"></v-textarea>
                    </v-card-text>
                  </v-col>
              </v-row>
              <v-row justify="center" no-gutters>
                <v-subheader>コメント一覧</v-subheader>
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(message, i) in messages"
                    :key="i"
                    hide-actions
                  >
                    <v-expansion-panel-header>
                      <v-row align="center" class="spacer" no-gutters>
                        <v-col cols="4" sm="2" md="1">
                          <v-avatar>
                            <v-img v-if="photoURL" :src="photoURL"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col class="hidden-xs-only" sm="5" md="3">
                          <span>{{ userName }}</span>
                        </v-col>
                        <v-col class="text-no-wrap" cols="5" sm="3">
                        </v-col>
                      </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-divider></v-divider>
                      <v-card-text v-text="lorem"></v-card-text>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
              <v-row no-gutters style="height:100px" align="center">
                <v-col align="center" cols="6">
                  <v-btn  @click="$router.push({ name: 'Company_reviews', params: {company_id: review.companyname } })">もっと見る</v-btn>
                </v-col>
                <v-col align="center" cols="6">
                  <v-btn  @click="$router.push({ name: 'Company_reviews', params: {company_id: review.companyname } })">コメントする</v-btn>
                </v-col>
              </v-row>
            </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

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
      review: {},
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
        },
        {
          color: 'red',
          icon: 'people',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'local_offer',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today',
        },
      ],
      lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
    }
  },
  methods: {
    ...mapActions(['addReview','updateReview'])
  },
  computed: {
    ...mapGetters(['userName', 'photoURL'])
  }
}
</script>