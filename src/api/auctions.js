import { buildQueryString, request, unwrap } from './http'

export async function getAuctionList(params = {}) {
  const suffix = buildQueryString(params)
  const data = await request(`/api/v1/auctions${suffix}`, {
    method: 'GET',
  })

  return unwrap(data)
}
