import defaultAvatar from '../assets/default-avatar.svg'

export const assets = {
  heroBackground: 'https://www.figma.com/api/mcp/asset/2c032067-2d24-4567-b3e8-93b8314cf536',
  watchImage: 'https://www.figma.com/api/mcp/asset/efb38393-6d05-42e3-bdbd-49d9c50c580f',
  homeIcon: 'https://www.figma.com/api/mcp/asset/cd652fb8-c0c4-4340-b0fd-ab57c46cacc2',
  categoryIcon: 'https://www.figma.com/api/mcp/asset/74cf0ac8-a459-4052-b743-87dee931bff0',
  registerIcon: 'https://www.figma.com/api/mcp/asset/cfd6b14c-3cb6-4eb7-99a8-5f03989fc719',
  inspectionIcon: 'https://www.figma.com/api/mcp/asset/d48c2f9f-af52-43c5-a115-5c3eb00869bf',
  searchIcon: 'https://www.figma.com/api/mcp/asset/9b2d42cb-846e-4175-8b6d-91f2732cca50',
  clockIcon: 'https://www.figma.com/api/mcp/asset/83902904-0c6b-4584-94b0-e308a090e676',
  heartIcon: 'https://www.figma.com/api/mcp/asset/4df025dc-4a10-4be3-aabb-72d7cd09fbbc',
  listSearchIcon: 'https://www.figma.com/api/mcp/asset/b4053bac-f43a-41c8-9cec-70b678bc5248',
  sortChevronIcon: 'https://www.figma.com/api/mcp/asset/4df20e91-7e32-47a7-8ea9-3c8deaf9a724',
  listWatchImage: 'https://www.figma.com/api/mcp/asset/e8c9af76-2653-419a-8da5-b7a65a36822d',
  mypageAvatar: defaultAvatar,
  mypageBadge: 'https://www.figma.com/api/mcp/asset/6f341c54-0e36-4d5a-a893-0a1f78729967',
  mypageProductImage: 'https://www.figma.com/api/mcp/asset/44924696-d661-434c-8b1f-c248e5201a84',
  mypageDashboardIcon: 'https://www.figma.com/api/mcp/asset/887eca34-d802-4708-99ec-92945a1ba784',
  mypageBidIcon: 'https://www.figma.com/api/mcp/asset/f3201d74-9473-482c-a76f-fd0b9c2bd915',
  mypageHeartIcon: 'https://www.figma.com/api/mcp/asset/fe553cbd-b56a-4797-897a-2ba1fed296ba',
  mypageBuyIcon: 'https://www.figma.com/api/mcp/asset/2e8c075b-2dfd-4e70-8205-7daaf7fddfc4',
  mypageSellIcon: 'https://www.figma.com/api/mcp/asset/849e3f38-d4ae-4cd6-a8ed-0e3b5f0dc3a6',
  mypageProfileIcon: 'https://www.figma.com/api/mcp/asset/bb9a67de-0694-4cdc-bc74-4b08ff97335a',
  mypageAddressIcon: 'https://www.figma.com/api/mcp/asset/290690e0-e933-452d-b9ce-042e6f313e7e',
  mypagePointIcon: 'https://www.figma.com/api/mcp/asset/5baeb94b-90df-4325-9145-cbb201e1300c',
  mypageInquiryIcon: 'https://www.figma.com/api/mcp/asset/b1dd571d-44b7-473b-b0e5-441778c65ba9',
  mypageOneToOneIcon: 'https://www.figma.com/api/mcp/asset/a1d7ee56-d641-48f2-ac43-e94e3f9cd34c',
}

export const navigationItems = [
  { label: '홈', icon: assets.homeIcon, key: 'home', route: '/' },
  { label: '카테고리', icon: assets.categoryIcon, key: 'list', route: '/auctions' },
  { label: '경매 등록', icon: assets.registerIcon, key: 'register', route: '/register' },
  { label: '검수', icon: assets.inspectionIcon, key: 'inspection', route: '/inspection' },
]

export const mypageNavigationItems = [
  { label: '대시보드', icon: assets.mypageDashboardIcon, key: 'mypage-dashboard', route: '/mypage' },
  { label: '입찰 내역', icon: assets.mypageBidIcon, key: 'mypage-bids', route: '/mypage' },
  { label: '관심 경매', icon: assets.mypageHeartIcon, key: 'mypage-hearts', route: '/mypage' },
  { label: '구매 내역', icon: assets.mypageBuyIcon, key: 'mypage-buys', route: '/mypage' },
  { label: '판매 내역', icon: assets.mypageSellIcon, key: 'mypage-sells', route: '/mypage' },
  { label: '경매 관리', icon: assets.mypageSellIcon, key: 'mypage-auctions', route: '/mypage' },
  { label: '프로필 관리', icon: assets.mypageProfileIcon, key: 'mypage-profile', route: '/mypage' },
  { label: '주소록 관리', icon: assets.mypageAddressIcon, key: 'mypage-address', route: '/mypage' },
  { label: '포인트 관리', icon: assets.mypagePointIcon, key: 'mypage-points', route: '/mypage' },
  { label: '구매/판매 문의 내역', icon: assets.mypageInquiryIcon, key: 'mypage-qa', route: '/mypage' },
  { label: '1:1 문의 내역', icon: assets.mypageOneToOneIcon, key: 'mypage-support', route: '/mypage' },
]

let itemSequence = 1

function buildItem(overrides = {}) {
  return {
    id: overrides.id ?? `auction-${itemSequence++}`,
    title: '롤렉스 시계',
    brand: '브랜드',
    price: '8,000,000',
    bids: '입찰 0회',
    time: '7분',
    highlight: false,
    seller: '셀러111',
    sellerGrade: 'GOLD',
    description:
      '2020년식 롤렉스 서브마리너 116610LN 모델입니다. 정기 점검을 받았으며, 모든 부속품과 보증서가 함께 제공됩니다. 실사용 흔적이 적고 베젤과 브레이슬릿 컨디션이 안정적으로 유지된 상품입니다.',
    inspectionLabel: '검수 완료 상품',
    inspectionDescription: '전문가 검수를 통과한 상품입니다.',
    buyNowPrice: '9,100,000',
    bidUnit: '100,000',
    startDate: '2026.04.01 09:00',
    endDate: '2026.04.01 23:59',
    inquiries: [
      {
        status: '답변 완료',
        title: '옥션 등록 절차에 대해 문의드립니다.',
        meta: '김구매 | 2023.10.24 14:30',
        question:
          '안녕하세요. 이번에 처음으로 옥션에 물품을 등록해보려고 합니다. 감정 절차가 얼마나 걸리는지, 그리고 등록비용이 따로 발생하는지 궁금합니다.',
        answer:
          '안녕하세요, 고객님. 문의주신 감정 절차는 영업일 기준 통상 3~5일 정도 소요됩니다. 현재 신규 회원을 대상으로 첫 등록 무료 프로모션을 진행하고 있어 별도의 등록비용은 발생하지 않습니다.',
      },
      {
        status: '답변 대기',
        title: '계정 관련 문의가 있습니다.',
        meta: '박구매 | 2023.10.23 17:10',
        question:
          '입찰 참여 후 결제 수단 변경이 가능한지 궁금합니다. 낙찰 이후 절차도 함께 확인하고 싶습니다.',
        answer: '',
      },
    ],
    history: [
      { bidder: 'bidder01', amount: '8,000,000', date: '2026.04.01 09:12' },
      { bidder: 'bidder02', amount: '7,900,000', date: '2026.04.01 08:48' },
      { bidder: 'bidder03', amount: '7,800,000', date: '2026.04.01 08:11' },
    ],
    ...overrides,
  }
}

export const bestItems = [
  buildItem({ highlight: true }),
  buildItem({ highlight: true }),
  buildItem(),
  buildItem(),
]

export const categoryGroups = [
  { label: '대분류', active: true, indent: 0 },
  { label: '중분류', active: false, indent: 1 },
  { label: '중분류', active: true, indent: 1 },
  { label: '소분류', active: true, indent: 2 },
  { label: '소분류', active: false, indent: 2 },
  { label: '소분류', active: false, indent: 2 },
  { label: '소분류', active: false, indent: 2 },
  { label: '중분류', active: false, indent: 1 },
  { label: '중분류', active: false, indent: 1 },
  { label: '대분류', active: false, indent: 0 },
  { label: '대분류', active: false, indent: 0 },
]

export const listItems = [
  buildItem({ highlight: true }),
  buildItem({ highlight: true }),
  buildItem(),
  buildItem(),
  buildItem({ highlight: true }),
  buildItem(),
]

export const registerOptions = [
  {
    title: '사전 검수 상품 등록',
    description:
      '검수센터로 상품을 발송해 진품 여부와 상태를 먼저 검수받은 뒤 경매에 올리는 방식입니다. 신뢰도 높은 상품에 적합합니다.',
    button: '검수 상품 등록하기',
    tone: 'inspection',
  },
  {
    title: '직접 상품 등록',
    description:
      '판매자가 사진과 상품 정보를 직접 입력해 즉시 경매 등록을 진행합니다. 빠르게 등록해야 하는 일반 상품에 적합합니다.',
    button: '직접 등록하기',
    tone: 'direct',
  },
]

export const inspectionSummary = [
  { label: '총 검수 완료', value: '1,284', tone: 'total' },
  { label: '검수 대기', value: '42', tone: 'review' },
  { label: '검수 승인', value: '15', tone: 'approve' },
  { label: '경매 진행 중', value: '1,227', tone: 'auction' },
]

export const inspectionItems = [
  buildItem({ title: '롤렉스 시계', brand: '롤렉스', status: '검수 통과', inspectionGrade: 'A+', inspectionDate: '2024 / 03 / 15' }),
  buildItem({ title: '롤렉스 데이토나', brand: '롤렉스', status: '검수 통과', inspectionGrade: 'A', inspectionDate: '2024 / 03 / 18' }),
  buildItem({ title: '오메가 씨마스터', brand: '오메가', status: '검수 통과', inspectionGrade: 'A+', inspectionDate: '2024 / 03 / 20' }),
  buildItem({ title: '까르띠에 탱크', brand: '까르띠에', status: '검수 통과', inspectionGrade: 'A', inspectionDate: '2024 / 03 / 22' }),
  buildItem({ title: '롤렉스 시계', brand: '롤렉스', status: '검수 대기', inspectionGrade: 'A+', inspectionDate: '2024 / 03 / 25' }),
  buildItem({ title: '에르메스 켈리', brand: '에르메스', status: '경매 진행 중', inspectionGrade: 'A+', inspectionDate: '2024 / 03 / 11' }),
  buildItem({ title: '롤렉스 시계', brand: '롤렉스', status: '검수 대기', inspectionGrade: 'A+', inspectionDate: '2024 / 03 / 27' }),
  buildItem({ title: '루이비통 알마', brand: '루이비통', status: '검수 반려', inspectionGrade: 'B+', inspectionDate: '2024 / 03 / 12' }),
]

export const mypageProfile = {
  seller: '닉네임 불러오기 실패',
  points: '포인트 불러오기 실패',
}

export const mypageBidItems = [
  {
    title: '갤럭시 S23 Ultra',
    status: '경매 진행 중',
    time: '7분',
    currentPrice: '₩950,000',
    myBidPrice: '₩950,000',
    date: '2026.03.03',
  },
  {
    title: '갤럭시 S23 Ultra',
    status: '경매 진행 중',
    time: '7분',
    currentPrice: '₩950,000',
    myBidPrice: '₩950,000',
    date: '2026.03.03',
  },
]

export const mypagePurchaseItems = [
  {
    title: '갤럭시 S23 Ultra',
    status: '거래완료',
    buyer: '김철수',
    price: '₩950,000',
    date: '2026.03.03',
  },
  {
    title: '갤럭시 S23 Ultra',
    status: '발송 대기',
    buyer: '김철수',
    price: '₩950,000',
    date: '2026.03.03',
  },
]

export const allAuctionItems = [...bestItems, ...listItems, ...inspectionItems]

export function findAuctionItemById(id) {
  return allAuctionItems.find((item) => item.id === id) ?? null
}
