import { createRouter, createWebHistory } from 'vue-router'
import AddressBookView from '../views/AddressBookView.vue'
import AuctionManagementView from '../views/AuctionManagementView.vue'
import BidHistoryView from '../views/BidHistoryView.vue'
import DashboardView from '../views/DashboardView.vue'
import PointsView from '../views/PointsView.vue'
import ProfileView from '../views/ProfileView.vue'
import PurchaseHistoryView from '../views/PurchaseHistoryView.vue'
import SalesHistoryView from '../views/SalesHistoryView.vue'
import SupportInquiryView from '../views/SupportInquiryView.vue'
import TradeInquiryView from '../views/TradeInquiryView.vue'
import WishlistView from '../views/WishlistView.vue'

const routes = [
  { path: '/mypage', name: 'dashboard', component: DashboardView },
  { path: '/mypage/notifications', redirect: '/mypage' },
  { path: '/mypage/bids', name: 'bids', component: BidHistoryView },
  { path: '/mypage/wishlists', name: 'favorites', component: WishlistView },
  { path: '/mypage/purchases', name: 'purchases', component: PurchaseHistoryView },
  { path: '/mypage/sales', name: 'sales', component: SalesHistoryView },
  { path: '/mypage/profile', name: 'profile', component: ProfileView },
  { path: '/mypage/auctions', name: 'auctions', component: AuctionManagementView },
  { path: '/mypage/addresses', name: 'addresses', component: AddressBookView },
  { path: '/mypage/points', name: 'points', component: PointsView },
  { path: '/mypage/trade-inquiries', name: 'trade-inquiries', component: TradeInquiryView },
  { path: '/mypage/direct-inquiries', name: 'support-inquiries', component: SupportInquiryView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
