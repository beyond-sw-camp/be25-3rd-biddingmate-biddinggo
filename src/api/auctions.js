import { buildQueryString, request, unwrap } from './http'

export async function getAuctionList(params = {}) {
  const suffix = buildQueryString(params)
  const data = await request(`/api/v1/auctions${suffix}`, {
    method: 'GET',
  })

  return unwrap(data)
}

export async function getAuctionDetail(auctionId) {
  const data = await request(`/api/v1/auctions/${auctionId}`, {
    method: 'GET',
  })

  return unwrap(data)
}
