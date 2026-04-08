import { createRouter, createWebHistory } from 'vue-router'
import AddressBookView from '../views/AddressBookView.vue'
import AuctionDetailView from '../views/AuctionDetailView.vue'
import AuctionEditView from '../views/AuctionEditView.vue'
import AuctionInquiryView from '../views/AuctionInquiryView.vue'
import AuctionListView from '../views/AuctionListView.vue'
import AuctionSearchView from '../views/AuctionSearchView.vue'
import AuctionManagementView from '../views/AuctionManagementView.vue'
import AdminInquiriesView from '../views/AdminInquiriesView.vue'
import AdminInspectionsView from '../views/AdminInspectionsView.vue'
import AdminNoticesView from '../views/AdminNoticesView.vue'
import AdminSettlementsView from '../views/AdminSettlementsView.vue'
import AdminTransactionsView from '../views/AdminTransactionsView.vue'
import AdminUsersView from '../views/AdminUsersView.vue'
import BidHistoryView from '../views/BidHistoryView.vue'
import DashboardView from '../views/DashboardView.vue'
import DirectInquiryView from '../views/DirectInquiryView.vue'
import HomeView from '../views/HomeView.vue'
import InspectionView from '../views/InspectionView.vue'
import LoginView from '../views/LoginView.vue'
import PointsView from '../views/PointsView.vue'
import ProfileSetupView from '../views/ProfileSetupView.vue'
import ProfileView from '../views/ProfileView.vue'
import PurchaseHistoryView from '../views/PurchaseHistoryView.vue'
import RegisterView from '../views/RegisterView.vue'
import SalesHistoryView from '../views/SalesHistoryView.vue'
import WishlistView from '../views/WishlistView.vue'
import AuthCallbackView from '../views/AuthCallbackView.vue'
import { authState } from '../lib/authSession'

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
    path: '/auctions/search',
    name: 'auction-search',
    component: AuctionSearchView,
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
    path: '/auctions/:id/edit',
    name: 'auction-edit',
    component: AuctionEditView,
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
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: AuthCallbackView,
  },
  {
    path: '/profile/setup',
    name: 'profile-setup',
    component: ProfileSetupView,
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
    path: '/admin',
    redirect: '/admin/transactions',
  },
  {
    path: '/admin/transactions',
    name: 'admin-transactions',
    component: AdminTransactionsView,
    meta: {
      navSection: 'admin',
      navKey: 'transactions',
    },
  },
  {
    path: '/admin/inquiries',
    name: 'admin-inquiries',
    component: AdminInquiriesView,
    meta: {
      navSection: 'admin',
      navKey: 'inquiries',
    },
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: AdminUsersView,
    meta: {
      navSection: 'admin',
      navKey: 'users',
    },
  },
  {
    path: '/admin/inspections',
    name: 'admin-inspections',
    component: AdminInspectionsView,
    meta: {
      navSection: 'admin',
      navKey: 'inspections',
    },
  },
  {
    path: '/admin/notices',
    name: 'admin-notices',
    component: AdminNoticesView,
    meta: {
      navSection: 'admin',
      navKey: 'notices',
    },
  },
  {
    path: '/admin/settlements',
    name: 'admin-settlements',
    component: AdminSettlementsView,
    meta: {
      navSection: 'admin',
      navKey: 'settlements',
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

router.beforeEach((to) => {
  const publicAuthRoutes = new Set(['login', 'auth-callback', 'profile-setup'])

  if (
    authState.isAuthenticated
    && authState.status === 'PENDING'
    && !publicAuthRoutes.has(String(to.name || ''))
  ) {
    return {
      name: 'profile-setup',
      query: { redirect: to.fullPath },
    }
  }

  if (authState.isAuthenticated && authState.status === 'ACTIVE' && to.name === 'profile-setup') {
    return { name: 'home' }
  }

  return true
})

export default router
