import { buildQueryString, request, unwrap } from './http'

export async function getInspectionList(params = {}) {
  const suffix = buildQueryString(params)
  const data = await request(`/api/v1/inspections${suffix}`, {
    auth: true,
    method: 'GET',
  })

  return unwrap(data)
}

export async function createInspection(payload) {
  const data = await request('/api/v1/inspections', {
    auth: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return unwrap(data)
}
