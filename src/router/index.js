import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import BidHistoryPage from '../pages/BidHistoryPage.vue'
import WishlistPage from '../pages/WishlistPage.vue'
import PurchaseHistoryPage from '../pages/PurchaseHistoryPage.vue'
import SalesHistoryPage from '../pages/SalesHistoryPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import AuctionManagementPage from '../pages/AuctionManagementPage.vue'
import AddressBookPage from '../pages/AddressBookPage.vue'
import PointsPage from '../pages/PointsPage.vue'
import TradeInquiryPage from '../pages/TradeInquiryPage.vue'
import SupportInquiryPage from '../pages/SupportInquiryPage.vue'

const routes = [
  { path: '/mypage', name: 'dashboard', component: DashboardPage },
  { path: '/mypage/notifications', redirect: '/mypage' },
  { path: '/mypage/bids', name: 'bids', component: BidHistoryPage },
  { path: '/mypage/wishlists', name: 'favorites', component: WishlistPage },
  { path: '/mypage/purchases', name: 'purchases', component: PurchaseHistoryPage },
  { path: '/mypage/sales', name: 'sales', component: SalesHistoryPage },
  { path: '/mypage/profile', name: 'profile', component: ProfilePage },
  { path: '/mypage/auctions', name: 'auctions', component: AuctionManagementPage },
  { path: '/mypage/addresses', name: 'addresses', component: AddressBookPage },
  { path: '/mypage/points', name: 'points', component: PointsPage },
  { path: '/mypage/trade-inquiries', name: 'trade-inquiries', component: TradeInquiryPage },
  { path: '/mypage/direct-inquiries', name: 'support-inquiries', component: SupportInquiryPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
