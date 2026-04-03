import { createRouter, createWebHistory } from 'vue-router'
import AddressBookView from '../views/AddressBookView.vue'
import AuctionDetailView from '../views/AuctionDetailView.vue'
import AuctionInquiryView from '../views/AuctionInquiryView.vue'
import AuctionListView from '../views/AuctionListView.vue'
import AuctionManagementView from '../views/AuctionManagementView.vue'
import BidHistoryView from '../views/BidHistoryView.vue'
import DashboardView from '../views/DashboardView.vue'
import DirectInquiryView from '../views/DirectInquiryView.vue'
import HomeView from '../views/HomeView.vue'
import InspectionView from '../views/InspectionView.vue'
import PointsView from '../views/PointsView.vue'
import ProfileView from '../views/ProfileView.vue'
import PurchaseHistoryView from '../views/PurchaseHistoryView.vue'
import RegisterView from '../views/RegisterView.vue'
import SalesHistoryView from '../views/SalesHistoryView.vue'
import WishlistView from '../views/WishlistView.vue'

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
    name: 'auction-list',
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
    name: 'mypage-dashboard',
    component: DashboardView,
    meta: {
      navSection: 'mypage',
      navKey: 'mypage-dashboard',
    },
  },
  {
    path: '/mypage/notifications',
    redirect: '/mypage',
  },
  {
    path: '/mypage/bids',
    name: 'bids',
    component: BidHistoryView,
    meta: {
      navSection: 'mypage',
      navKey: 'bids',
    },
  },
  {
    path: '/mypage/wishlists',
    name: 'favorites',
    component: WishlistView,
    meta: {
      navSection: 'mypage',
      navKey: 'favorites',
    },
  },
  {
    path: '/mypage/purchases',
    name: 'purchases',
    component: PurchaseHistoryView,
    meta: {
      navSection: 'mypage',
      navKey: 'purchases',
    },
  },
  {
    path: '/mypage/sales',
    name: 'sales',
    component: SalesHistoryView,
    meta: {
      navSection: 'mypage',
      navKey: 'sales',
    },
  },
  {
    path: '/mypage/auctions',
    name: 'auction-management',
    component: AuctionManagementView,
    meta: {
      navSection: 'mypage',
      navKey: 'auction-management',
    },
  },
  {
    path: '/mypage/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      navSection: 'mypage',
      navKey: 'profile',
    },
  },
  {
    path: '/mypage/addresses',
    name: 'addresses',
    component: AddressBookView,
    meta: {
      navSection: 'mypage',
      navKey: 'addresses',
    },
  },
  {
    path: '/mypage/points',
    name: 'points',
    component: PointsView,
    meta: {
      navSection: 'mypage',
      navKey: 'points',
    },
  },
  {
    path: '/mypage/trade-inquiries',
    redirect: '/mypage/auction-inquiries',
  },
  {
    path: '/mypage/auction-inquiries',
    name: 'auction-inquiries',
    component: AuctionInquiryView,
    meta: {
      navSection: 'mypage',
      navKey: 'auction-inquiries',
    },
  },
  {
    path: '/mypage/direct-inquiries',
    name: 'direct-inquiries',
    component: DirectInquiryView,
    meta: {
      navSection: 'mypage',
      navKey: 'direct-inquiries',
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
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
