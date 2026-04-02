import { createRouter, createWebHistory } from 'vue-router'
import AuctionDetailView from '../views/AuctionDetailView.vue'
import AuctionListView from '../views/AuctionListView.vue'
import HomeView from '../views/HomeView.vue'
import InspectionView from '../views/InspectionView.vue'
import MyPageView from '../views/MyPageView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      navSection: 'main',
      navKey: 'home',
    },
  },
  {
    path: '/auctions',
    name: 'auctions',
    component: AuctionListView,
    meta: {
      navSection: 'main',
      navKey: 'list',
    },
  },
  {
    path: '/auctions/:id',
    name: 'auction-detail',
    component: AuctionDetailView,
    meta: {
      navSection: 'main',
      navKey: 'list',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      navSection: 'main',
      navKey: 'register',
    },
  },
  {
    path: '/inspection',
    name: 'inspection',
    component: InspectionView,
    meta: {
      navSection: 'main',
      navKey: 'inspection',
    },
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView,
    meta: {
      navSection: 'mypage',
      navKey: 'mypage-dashboard',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
