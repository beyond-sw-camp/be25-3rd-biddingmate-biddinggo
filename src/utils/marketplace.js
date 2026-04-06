export function formatNumber(value) {
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
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
  return {
    id: result.auctionId ? `auction-${result.auctionId}` : `auction-${result.item?.itemId || 'unknown'}`,
    auctionId: result.auctionId,
    title: result.item?.name || result.name || '등록 상품',
    brand: result.item?.brand || result.brand || '브랜드 미정',
    price: formatNumber(result.startPrice),
    bids: `입찰 ${result.bidCount ?? 0}회`,
    time: getCountdownLabel(result.endDate),
    highlight: result.status === 'ON_GOING',
    image: result.item?.images?.[0]?.url || result.representativeImageUrl || '',
  }
}
