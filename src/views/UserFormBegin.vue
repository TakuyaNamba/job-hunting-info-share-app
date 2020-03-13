<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>ユーザー情報編集画面</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
               <v-text-field v-model="$store.getters.userName" label="名前" disabled="true"></v-text-field>
               <v-text-field v-model="user.university" label="大学"></v-text-field>
               <v-text-field v-model="user.grade" label="学年"></v-text-field>
               <v-text-field v-model="user.major" label="専攻"></v-text-field>
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
        if (!this.$route.params.user_id) return
        
        const user = this.$store.state.user.info
        if (user) {
            this.user = user
        } else {
            this.$router.push({ name: 'Homepage' })
        }
    },
    data () {
        return {
            user: {}
        }
    },
    methods: {
        submit () {
            if (this.user.uid) {
                this.updateUser(this.user)
            } else {
            this.addUser(this.user)
            }
            this.$router.push({ name: 'Homepage' })
        },
        ...mapActions(['getUser','addUser','updateUser'])
    }
}
</script>