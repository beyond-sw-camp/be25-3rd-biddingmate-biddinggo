export const navItems = [
  { label: '홈', route: '/mypage' },
  { label: '입찰 내역', route: '/mypage/bids' },
  { label: '관심 경매', route: '/mypage/wishlists' },
  { label: '구매 내역', route: '/mypage/purchases' },
  { label: '판매 내역', route: '/mypage/sales' },
  { label: '경매 관리', route: '/mypage/auctions' },
  { label: '프로필 관리', route: '/mypage/profile' },
  { label: '주소록 관리', route: '/mypage/addresses' },
  { label: '포인트 관리', route: '/mypage/points' },
  { label: '구매/판매 문의 내역', route: '/mypage/trade-inquiries' },
  { label: '1:1 문의 내역', route: '/mypage/direct-inquiries' },
]

export const overviewUser = {
  name: '셀러111',
  points: '1,850,000 P',
  rating: '4.8',
  reviews: '리뷰 100',
  joinedAt: '2022. 03. 15',
  avatar: 'https://www.figma.com/api/mcp/asset/dd0da364-93f1-438f-8d82-b5dc730cd83d',
}

export const phoneImage = 'https://www.figma.com/api/mcp/asset/ff4e2075-6f6b-4c57-859f-d3f2dde1e754'
export const laptopImage = 'https://www.figma.com/api/mcp/asset/94623f05-bba9-45d3-b186-98f293a5b1ae'
export const watchImage = 'https://www.figma.com/api/mcp/asset/ad985137-5279-4eee-9dda-da932d9d5efc'

export const bidItems = [
  { status: '경매 진행 중', name: '갤럭시 S23 Ultra', image: phoneImage, time: '7분', currentPrice: '₩950,000', myBid: '₩950,000', date: '2026.03.03' },
  { status: '경매 진행 중', name: '갤럭시 S23 Ultra', image: phoneImage, time: '7분', currentPrice: '₩950,000', myBid: '₩950,000', date: '2026.03.03' },
  { status: '입찰 실패', name: '갤럭시 S23 Ultra', image: phoneImage, time: '종료', currentPrice: '₩950,000', myBid: '₩910,000', date: '2026.03.01' },
  { status: '거래 완료', name: '갤럭시 S23 Ultra', image: phoneImage, time: '완료', currentPrice: '₩950,000', myBid: '₩950,000', date: '2026.02.28' },
]

export const purchaseStatusItems = [
  {
    status: '거래완료',
    name: '갤럭시 S23 Ultra',
    person: '구매자: 김철수',
    price: '₩950,000',
    date: '2026.03.03',
    modalType: 'readonly',
  },
  {
    status: '발송 대기',
    name: '롤렉스 시계',
    person: '구매자: 김철수',
    price: '1,500,000원',
    date: '2026.03.03',
    modalType: 'pending-no-address',
    category: '럭셔리 > 시계 > 남성용 시계',
    image: watchImage,
    shippingAddress: null,
    shippingInfo: null,
  },
  {
    status: '배송 중',
    name: '갤럭시 S23 Ultra',
    person: '구매자: 김철수',
    price: '₩950,000',
    date: '2026.02.27',
    modalType: 'readonly',
  },
  {
    status: '배송 완료',
    name: '롤렉스 시계',
    person: '구매자: 김구매',
    price: '1,500,000원',
    date: '2026.02.25',
    modalType: 'delivery-complete-awaiting-confirm',
    category: '럭셔리 > 시계 > 남성용 시계',
    image: watchImage,
    shippingAddress: {
      name: '김구매',
      phone: '010-1234-5678',
      zip: '06234',
      address1: '서울특별시 강남구 테헤란로 123',
      address2: '아크로타워 1502호',
    },
    shippingInfo: {
      courier: '우체국 택배',
      trackingNumber: '1928391823798',
    },
  },
  {
    status: '구매 확정',
    name: '갤럭시 S23 Ultra',
    person: '구매자: 김철수',
    price: '₩950,000',
    date: '2026.02.24',
    modalType: 'readonly',
  },
]

export const modalAddressBook = [
  { zip: '06234', address1: '서울특별시 강남구 테헤란로 123', address2: '아크로타워 1502호', primary: true },
  { zip: '06234', address1: '서울특별시 강남구 테헤란로 123', address2: '아크로타워 1502호', primary: false },
  { zip: '06234', address1: '서울특별시 강남구 테헤란로 123', address2: '아크로타워 1502호', primary: false },
  { zip: '06234', address1: '서울특별시 강남구 테헤란로 123', address2: '아크로타워 1502호', primary: false },
]

export const salesStatusItems = [
  { status: '판매완료', name: '갤럭시 S23 Ultra', person: '구매자: 김철수', price: '₩950,000', date: '2026.03.03' },
  { status: '발송 준비', name: '갤럭시 S23 Ultra', person: '구매자: 김철수', price: '₩950,000', date: '2026.03.01' },
  { status: '배송 중', name: '갤럭시 S23 Ultra', person: '구매자: 김철수', price: '₩950,000', date: '2026.02.28' },
  { status: '구매 확정', name: '갤럭시 S23 Ultra', person: '구매자: 김철수', price: '₩950,000', date: '2026.02.26' },
  { status: '정산 완료', name: '갤럭시 S23 Ultra', person: '구매자: 김철수', price: '₩950,000', date: '2026.02.21' },
]

export const favoriteItems = Array.from({ length: 8 }, (_, index) => ({
  tag: index < 4 ? 'TIME DEAL' : '',
  name: '롤렉스 시계',
  image: watchImage,
  currentPrice: '8,000,000',
  bidCount: '입찰 0회',
  time: '7분',
  highlighted: index === 0 || index === 4,
}))

export const auctionSummary = [
  { label: '총 경매 상품', value: '1,284' },
  { label: '경매 진행 중', value: '42' },
  { label: '낙찰', value: '15' },
  { label: '유찰', value: '1,227' },
]

export const auctionItems = Array.from({ length: 8 }, (_, index) => ({
  tag: index < 2 ? 'TIME DEAL' : '',
  name: '롤렉스 시계',
  image: watchImage,
  currentPrice: '8,000,000',
  bidCount: '입찰 0회',
  time: '7분',
  highlighted: index === 0 || index === 1 || index === 5,
}))

export const addresses = [
  { zip: '06234', address: '서울특별시 강남구 테헤란로 123 아크로타워 1502호', primary: true },
  { zip: '06234', address: '서울특별시 강남구 테헤란로 123 아크로타워 1502호', primary: false },
  { zip: '06234', address: '서울특별시 강남구 테헤란로 123 아크로타워 1502호', primary: false },
  { zip: '06234', address: '서울특별시 강남구 테헤란로 123 아크로타워 1502호', primary: false },
]

export const pointHistory = [
  { title: '충전', date: '2026.03.01 12:30', amount: '+500,000 원', tone: 'plus' },
  { title: '사용', date: '2026.02.27 08:00', amount: '-2,400,000 원', tone: 'minus' },
  { title: '환불', date: '2026.02.21 17:20', amount: '+120,000 원', tone: 'plus' },
  { title: '충전', date: '2026.02.02 09:10', amount: '+1,000,000 원', tone: 'plus' },
]

export const notifications = [
  { title: '배송 완료', body: '주문하신 경매 상품 [맥북] 의 배송이 완료되었습니다. 구매 확정 후 후기를 작성해주세요.', time: '3일 전', image: laptopImage, unread: true },
  { title: '배송 시작', body: '주문하신 경매 상품 [맥북] 의 배송이 시작되었습니다.', time: '3일 전', image: laptopImage, unread: true },
  { title: '낙찰', body: '경매 [롤렉스 시계] 에 낙찰되었습니다. 배송지를 확인해주세요.', time: '3일 전', image: laptopImage, unread: false },
  { title: '경매 종료', body: '경매 [롤렉스 시계] 가 종료되었습니다.', time: '3일 전', image: laptopImage, unread: false },
]

export const tradeInquiries = [
  {
    status: '답변 완료',
    title: '옥션 등록 절차에 대해 문의드립니다.',
    date: '2026.03.05 13:40',
    question: '안녕하세요. 이번에 처음으로 옥션에 물품을 등록해보려고 합니다. 감정 절차가 얼마나 걸리는지, 그리고 등록 비용이 따로 발생하는지 궁금합니다.',
    answerAuthor: '판매자 답변',
    answerDate: '2026.03.05 15:10',
    answer: '안녕하세요, 고객님. 감정 절차는 영업일 기준 3~5일 정도 소요됩니다. 현재 신규 회원을 대상으로 첫 등록 무료 프로모션을 진행하고 있어 별도의 등록 비용은 발생하지 않습니다.',
    expanded: true,
    action: '상품 보러가기',
  },
  {
    status: '답변 대기',
    title: '옥션 등록 절차에 대해 문의드립니다.',
    date: '2026.03.04 18:00',
    question: '안녕하세요. 이번에 처음으로 옥션에 물품을 등록해보려고 합니다. 감정 절차가 얼마나 걸리는지, 그리고 등록 비용이 따로 발생하는지 궁금합니다.',
    expanded: true,
    pendingAction: '문의 수정하기',
    action: '상품 보러가기',
  },
  { status: '답변 대기', title: '배송 주소지를 변경하고 싶습니다.', date: '2026.03.01 11:15', expanded: false, action: '상품 보러가기' },
  { status: '답변 대기', title: '포인트 환급 관련 문의', date: '2026.02.26 09:20', expanded: false, action: '상품 보러가기' },
]

export const supportInquiries = [
  {
    status: '답변 완료',
    title: '분쟁 해결',
    date: '2026.03.05 13:40',
    question: '안녕하세요. 배송 이후 상품 상태와 관련해 분쟁이 발생해 문의드립니다. 처리 절차와 예상 소요 시간을 알고 싶습니다.',
    answerAuthor: '관리자 답변',
    answerDate: '2026.03.05 15:10',
    answer: '문의해주신 건은 현재 접수되었으며 영업일 기준 1~2일 내 담당자가 검토 후 연락드릴 예정입니다. 추가 증빙 자료가 있으면 문의에 첨부해 주세요.',
    expanded: true,
  },
  { status: '답변 대기', title: '결제', date: '2026.03.01 11:15', expanded: false },
  { status: '답변 대기', title: '계정', date: '2026.02.21 18:20', expanded: false },
  { status: '답변 대기', title: '결제', date: '2026.02.20 09:20', expanded: false },
]
