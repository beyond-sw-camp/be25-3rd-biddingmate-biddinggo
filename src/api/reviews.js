import { buildQueryString, request, unwrap } from './http'

export async function getSellerReviews(sellerId, params = {}) {
  const suffix = buildQueryString(params)
  const data = await request(`/api/v1/auctions/${sellerId}/reviews${suffix}`, {
    method: 'GET',
  })

  return unwrap(data)
}
