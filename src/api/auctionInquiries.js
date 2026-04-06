import { buildQueryString, request, unwrap } from './http'

export async function createAuctionInquiry(payload) {
  const data = await request('/api/v1/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return unwrap(data)
}

export async function getAuctionInquiryList(auctionId, params = {}) {
  const suffix = buildQueryString(params)
  const data = await request(`/api/v1/inquiries/auctions/${auctionId}/inquiries${suffix}`, {
    method: 'GET',
  })

  return unwrap(data)
}
