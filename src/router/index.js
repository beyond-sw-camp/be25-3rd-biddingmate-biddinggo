import { createRouter, createWebHistory } from 'vue-router'
import AddressBookView from '../views/AddressBookView.vue'
import AuctionDetailView from '../views/AuctionDetailView.vue'
import AuctionInquiryView from '../views/AuctionInquiryView.vue'
import AuctionListView from '../views/AuctionListView.vue'
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
import MyPageLayout from '../components/layout/MyPageLayout.vue'
import PointsView from '../views/PointsView.vue'
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
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      navSection: 'main',
      navKey: '',
    },
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: AuthCallbackView,
  },
  {
    path: '/mypage',
    component: MyPageLayout,
    meta: {
      navSection: 'mypage',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'mypage-dashboard',
        component: DashboardView,
        meta: {
          navKey: 'mypage-dashboard',
        },
      },
      {
        path: 'notifications',
        redirect: '/mypage',
      },
      {
        path: 'bids',
        name: 'bids',
        component: BidHistoryView,
        meta: {
          navKey: 'bids',
        },
      },
      {
        path: 'wishlists',
        name: 'favorites',
        component: WishlistView,
        meta: {
          navKey: 'favorites',
        },
      },
      {
        path: 'purchases',
        name: 'purchases',
        component: PurchaseHistoryView,
        meta: {
          navKey: 'purchases',
        },
      },
      {
        path: 'sales',
        name: 'sales',
        component: SalesHistoryView,
        meta: {
          navKey: 'sales',
        },
      },
      {
        path: 'auctions',
        name: 'auction-management',
        component: AuctionManagementView,
        meta: {
          navKey: 'auction-management',
        },
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        meta: {
          navKey: 'profile',
        },
      },
      {
        path: 'addresses',
        name: 'addresses',
        component: AddressBookView,
        meta: {
          navKey: 'addresses',
        },
      },
      {
        path: 'points',
        name: 'points',
        component: PointsView,
        meta: {
          navKey: 'points',
        },
      },
      {
        path: 'trade-inquiries',
        redirect: '/mypage/auction-inquiries',
      },
      {
        path: 'auction-inquiries',
        name: 'auction-inquiries',
        component: AuctionInquiryView,
        meta: {
          navKey: 'auction-inquiries',
        },
      },
      {
        path: 'direct-inquiries',
        name: 'direct-inquiries',
        component: DirectInquiryView,
        meta: {
          navKey: 'direct-inquiries',
        },
      },
    ],
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
  if (to.matched.some((route) => route.meta.requiresAuth) && !authState.isAuthenticated) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  return true
})

export default router
