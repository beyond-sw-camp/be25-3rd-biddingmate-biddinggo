import { computed, ref } from 'vue'

const reportTypes = [
  '위조품 / 가짜 상품',
  '허위 / 과장 정보',
  '부적절한 콘텐츠',
  '중복 등록',
  '도난물 의심',
  '기타',
]

const bidHistoryRows = [
  '1번 입찰자',
  '2번 입찰자',
  '3번 입찰자',
  '4번 입찰자',
  '5번 입찰자',
  '6번 입찰자',
  '1번 입찰자',
  '2번 입찰자',
  '2번 입찰자',
  '2번 입찰자',
  '7번 입찰자',
  '8번 입찰자',
  '1번 입찰자',
  '10번 입찰자',
].map((bidder) => ({
  bidder,
  amount: '***원',
  date: '20xx/xx/xx xx:xx:xx.xx',
}))

const sellerProfile = {
  avatar: 'https://www.figma.com/api/mcp/asset/1a84177d-d7c8-4353-8a50-20c14d87fbe5',
  badge: 'https://www.figma.com/api/mcp/asset/81111f1e-47ca-4819-bcc5-08161ec6a90c',
  rating: '4.8',
  reviewCount: 100,
  joinedAt: '2022. 03. 15',
  stats: [
    { label: '총 판매 건수', value: '1,000' },
    { label: '판매 취소', value: '3' },
    { label: '반품', value: '0' },
    { label: '응답률', value: '98%' },
  ],
  reviews: [
    {
      author: 'Kim_D***',
      date: '2023. 11. 24',
      rating: 5,
      content:
        '포장이 정말 꼼꼼하게 잘 되어 왔습니다. 배송도 생각보다 훨씬 빠르고 물건 상태도 설명하신 것보다 더 좋네요. 믿고 거래할 수 있는 판매자입니다.',
    },
    {
      author: 'Lee_H***',
      date: '2023. 11. 20',
      rating: 4,
      content: '답변이 아주 빠르셔서 궁금한 점을 바로 해결할 수 있었습니다. 좋은 경매 감사합니다!',
    },
  ],
}

function parseAmount(value) {
  return Number(String(value).replace(/[^\d]/g, '')) || 0
}

function formatAmount(value) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

export function useAuctionDetailState(item) {
  const minimumBidAmount = computed(() => parseAmount(item.value.price) + parseAmount(item.value.bidUnit))
  const buyNowAmount = computed(() => parseAmount(item.value.buyNowPrice))

  const isSellerModalOpen = ref(false)
  const isBidModalOpen = ref(false)
  const isBidHistoryDrawerOpen = ref(false)
  const isReportModalOpen = ref(false)
  const isInquiryModalOpen = ref(false)

  const reportForm = ref({
    type: '기타',
    detail: '',
  })
  const inquiryForm = ref({
    isPrivate: true,
    title: '',
    content: '',
  })
  const bidAmount = ref('')

  function openSellerModal() {
    isSellerModalOpen.value = true
  }

  function closeSellerModal() {
    isSellerModalOpen.value = false
  }

  function syncBidAmount(value = minimumBidAmount.value) {
    bidAmount.value = formatAmount(value)
  }

  function openBidModal() {
    isBidHistoryDrawerOpen.value = false
    syncBidAmount()
    isBidModalOpen.value = true
  }

  function closeBidModal() {
    isBidModalOpen.value = false
  }

  function stepBid(direction) {
    const nextAmount =
      parseAmount(bidAmount.value || minimumBidAmount.value) + parseAmount(item.value.bidUnit) * direction
    syncBidAmount(Math.max(minimumBidAmount.value, nextAmount))
  }

  function submitBid() {
    isBidModalOpen.value = false
  }

  function buyNow() {
    isBidModalOpen.value = false
  }

  function openBidHistoryDrawer() {
    isBidHistoryDrawerOpen.value = true
  }

  function closeBidHistoryDrawer() {
    isBidHistoryDrawerOpen.value = false
  }

  function openReportModal() {
    isReportModalOpen.value = true
  }

  function closeReportModal() {
    isReportModalOpen.value = false
  }

  function submitReport() {
    isReportModalOpen.value = false
  }

  function openInquiryModal() {
    isInquiryModalOpen.value = true
  }

  function closeInquiryModal() {
    isInquiryModalOpen.value = false
  }

  function submitInquiry() {
    isInquiryModalOpen.value = false
  }

  return {
    bidAmount,
    bidHistoryRows,
    buyNowAmount,
    closeBidHistoryDrawer,
    closeBidModal,
    closeInquiryModal,
    closeReportModal,
    closeSellerModal,
    formatAmount,
    inquiryForm,
    isBidHistoryDrawerOpen,
    isBidModalOpen,
    isInquiryModalOpen,
    isReportModalOpen,
    isSellerModalOpen,
    minimumBidAmount,
    openBidHistoryDrawer,
    openBidModal,
    openInquiryModal,
    openReportModal,
    openSellerModal,
    reportForm,
    reportTypes,
    sellerProfile,
    stepBid,
    submitBid,
    submitInquiry,
    submitReport,
    buyNow,
  }
}
