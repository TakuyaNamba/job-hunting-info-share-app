import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Homepage from '../views/Homepage.vue'
import UserFormBegin from '../views/UserFormBegin.vue'
import UserForm from '../views/UserForm.vue'
import Companies from '../views/Companies.vue'
import CompanyForm from '../views/CompanyForm.vue'
import CompanyReviews from '../views/CompanyReviews.vue'
import ReviewForm from '../views/ReviewForm.vue'
import ReviewComments from '../views/ReviewComments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/users/begin',
    name: 'User_begin',
    component: UserFormBegin
  },
  {
    path: '/users/:user_id?/edit',
    name: 'User_edit',
    component: UserForm
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies
  },
  {
    path: '/companies/:company_id?/edit',
    name: 'Company_edit',
    component: CompanyForm
  },
  {
    path: '/companies/:company_id?/reviews',
    name: 'Company_reviews',
    component: CompanyReviews
  },
  {
    path: '/companies/:company_id?/reviews/:review_id?/edit',
    name: 'Review_edit',
    component: ReviewForm
  },
  {
    path: '/companies/:company_id?/reviews/:review_id?/comments',
    name: 'Review_comments',
    component: ReviewComments
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
