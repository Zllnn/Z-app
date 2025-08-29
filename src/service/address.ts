import axios from '@/utils/axios'

export function addAddress(params: Record<string, unknown>) {
  return axios.post('/address', params)
}

export function EditAddress(params: Record<string, unknown>) {
  return axios.put('/address', params)
}

export function DeleteAddress(id: string | number) {
  return axios.delete(`/address/${id}`)
}

export function getDefaultAddress() {
  return axios.get('/address/default')
}

export function getAddressList() {
  return axios.get('/address', { params: { pageNumber: 1, pageSize: 1000 } })
}

export function getAddressDetail(id: string | number) {
  return axios.get(`/address/${id}`)
}


