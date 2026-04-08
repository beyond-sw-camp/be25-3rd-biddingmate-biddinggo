export function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export function formatPrice(value, { suffix = '' } = {}) {
  const formatted = formatNumber(value)

  return suffix ? `${formatted}${suffix}` : formatted
}

export function formatDateTime(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function getCountdownLabel(value) {
  if (!value) {
    return '-'
  }

  const endTime = new Date(value).getTime()
  const diff = endTime - Date.now()

  if (!Number.isFinite(diff) || diff <= 0) {
    return '마감'
  }

  const totalMinutes = Math.floor(diff / (1000 * 60))
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  if (totalDays > 0) {
    return `${totalDays}일`
  }

  if (totalHours > 0) {
    return `${totalHours}시간`
  }

  return `${Math.max(totalMinutes, 1)}분`
}

export function normalizeAuctionCard(result = {}) {
  const auctionType = normalizeEnumValue(result.type ?? result.auctionType)

  return {
    id: result.auctionId ? `auction-${result.auctionId}` : `auction-${result.item?.itemId || 'unknown'}`,
    auctionId: result.auctionId,
    auctionType,
    title: result.item?.name || result.name || '등록 상품',
    brand: result.item?.brand || result.brand || '브랜드 미정',
    price: formatPrice(result.startPrice),
    bids: `입찰 ${result.bidCount ?? 0}회`,
    wishCount: Number(result.wishCount || 0),
    isWished: Boolean(result.isWished ?? result.wished ?? false),
    time: getCountdownLabel(result.endDate),
    highlight: result.status === 'ON_GOING',
    isTimeDeal: auctionType === 'TIME_DEAL',
    image: result.item?.images?.[0]?.url || result.representativeImageUrl || '',
  }
}

export function normalizeBidHistory(rows = []) {
  if (!rows.length) {
    return [
      { bidder: '아직 입찰 없음', amount: '-', date: '-' },
      { bidder: '대기 중', amount: '-', date: '-' },
      { bidder: '대기 중', amount: '-', date: '-' },
    ]
  }

  return rows.map((row) => ({
    bidder: `${row.bidderId ?? '-'}번 회원`,
    amount: `${formatPrice(row.amount)}원`,
    date: formatDateTime(row.createdAt),
  }))
}

export function normalizeInquiries(rows = []) {
  if (!rows.length) {
    return []
  }

  return rows.map((row) => ({
    id: row.id,
    status: row.answer ? '답변 완료' : '답변 대기',
    title: row.title || '문의',
    meta: `${row.writerName || '익명'} | ${formatDateTime(row.createdAt)}`,
    question: row.content || '',
    answeredAt: formatDateTime(row.answeredAt),
    answer: row.answer || '아직 답변이 등록되지 않았습니다.',
  }))
}

export function normalizeSellerReviews(rows = []) {
  return rows.map((row) => ({
    author: row.buyerNickname || '구매자',
    date: formatDateTime(row.reviewDate),
    rating: Math.round(Number(row.rating || 0)),
    content: row.reviewText || '리뷰 내용이 없습니다.',
  }))
}

function normalizeEnumValue(value) {
  return String(value || '').trim().toUpperCase()
}

export function normalizeAuctionDetail(
  detail = {},
  { bidHistory = [], inquiries = [], sellerReviews = [], wishlistStatus = {} } = {},
) {
  const currentPrice = detail.vickreyPrice ?? detail.vickrey_price ?? detail.startPrice
  const sellerName = detail.sellerNickname || (detail.sellerId ? `판매자 ${detail.sellerId}` : '판매자')
  const sellerRating = Number(detail.sellerRating || 0)
  const sellerReviewCount = Number(detail.sellerReviewCount || 0)
  const auctionType = normalizeEnumValue(detail.type ?? detail.auctionType)
  const inspectionYn = normalizeEnumValue(detail.inspectionYn ?? detail.inspection_yn)
  const isInspected = auctionType === 'INSPECTION' || inspectionYn === 'YES'

  return {
    id: detail.auctionId ? `auction-${detail.auctionId}` : 'auction-detail',
    auctionId: detail.auctionId,
    auctionType,
    itemId: detail.item?.itemId,
    sellerId: detail.sellerId,
    sellerAvatar: detail.sellerImageUrl || '',
    sellerJoinedAt: formatShortDate(detail.sellerCreatedAt),
    sellerRating: sellerRating ? sellerRating.toFixed(1) : '0.0',
    sellerReviewCount,
    sellerReviews: normalizeSellerReviews(sellerReviews),
    title: detail.item?.name || '상품명 없음',
    brand: detail.item?.brand || '브랜드 미정',
    price: formatPrice(currentPrice),
    startPrice: formatPrice(detail.startPrice),
    bids: `입찰 ${detail.bidCount ?? 0}회`,
    wishCount: Number(detail.wishCount || 0),
    isWished: Boolean(wishlistStatus?.wished),
    time: getCountdownLabel(detail.endDate),
    highlight: detail.status === 'ON_GOING',
    isTimeDeal: auctionType === 'TIME_DEAL',
    isInspected,
    seller: sellerName,
    sellerGrade: detail.sellerGrade || (isInspected ? 'CERTIFIED' : 'STANDARD'),
    description: detail.item?.description || '상품 설명이 없습니다.',
    inspectionLabel: isInspected ? '검수 완료 상품' : '일반 등록 상품',
    inspectionDescription:
      isInspected
        ? '전문가 검수를 통과한 상품입니다.'
        : '판매자가 직접 등록한 상품입니다.',
    buyNowPrice: `${formatPrice(detail.buyNowPrice)}원`,
    bidUnit: `${formatPrice(detail.bidUnit)}원`,
    startDate: formatDateTime(detail.startDate),
    endDate: formatDateTime(detail.endDate),
    history: normalizeBidHistory(bidHistory),
    inquiries: normalizeInquiries(inquiries),
    images: detail.item?.images || [],
    image: detail.item?.images?.[0]?.url || detail.representativeImageUrl || '',
  }
}

export function formatShortDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date(value))
    .replace(/\. /g, ' / ')
    .replace('.', '')
}

export function normalizeInspectionPickItem(result = {}) {
  return {
    inspectionId: result.inspectionId,
    itemId: result.itemId,
    title: result.name || '검수 상품',
    brand: result.brand || '브랜드 미정',
    inspectionGrade: result.quality || '-',
    inspectionDate: formatShortDate(result.createdAt),
    description: `${result.brand || '브랜드 미정'} ${result.name || ''}`.trim(),
    image: result.representativeImageUrl || '',
    carrier: result.carrier || '',
    trackingNumber: result.trackingNumber || '',
    categoryLabel: '',
  }
}

export function normalizeInspectionListItem(result = {}) {
  const status = normalizeEnumValue(result.inspectionStatus ?? result.status)
  const item = result.item || {}
  const category = item.category || result.category || {}
  const categoryLabel = category.name ? `${category.name}` : ''

  return {
    inspectionId: result.inspectionId,
    itemId: result.itemId ?? item.itemId,
    title: result.name || item.name || '검수 상품',
    brand: result.brand || item.brand || '브랜드 미정',
    status,
    statusLabel: INSPECTION_STATUS_LABELS[status] || '검수 상태 없음',
    inspectionGrade: result.quality || item.quality || '-',
    inspectionDate: formatShortDate(result.createdAt),
    description: item.description || `${result.brand || item.brand || '브랜드 미정'} ${result.name || item.name || ''}`.trim(),
    image: result.representativeImageUrl || item.images?.[0]?.url || '',
    carrier: result.carrier || '',
    trackingNumber: result.trackingNumber || '',
    categoryLabel,
  }
}

export function buildInspectionSummary(items = []) {
  const counts = items.reduce(
    (acc, item) => {
      acc.total += 1
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    },
    { total: 0 },
  )

  return [
    { label: '총 검수 신청', value: formatNumber(counts.total), tone: 'total' },
    { label: '검수 대기', value: formatNumber(counts.PENDING || 0), tone: 'review' },
    { label: '검수 통과', value: formatNumber(counts.PASSED || 0), tone: 'approve' },
    { label: '검수 반려', value: formatNumber(counts.FAILED || 0), tone: 'auction' },
  ]
}

export const INSPECTION_STATUS_LABELS = {
  PENDING: '검수 대기',
  PASSED: '검수 통과',
  FAILED: '검수 반려',
}
