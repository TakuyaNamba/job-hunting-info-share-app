import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Companies from '../views/Companies.vue'
import CompanyForm from '../views/CompanyForm.vue'
import CompanyReviews from '../views/CompanyReviews.vue'
import ReviewForm from '../views/ReviewForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
