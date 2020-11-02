import APIS from './common/apis'
import request from '@/utils/request'


export function archivesGet(data={}, uid) {
  const api = APIS['archives']
  const url = `${api.uri}${uid}/get`
  return request.request({
    url: url,
    method: api.method,
    params: data
  })
}
export function archivesEd(data={}) {
  const api = APIS['archivesEdid']
  const url = api.uri
  const method = api.method
  return request.request(url, data, { method })
}
export function deleteArchive(data={}) {
  const api = APIS['deleteArchive']
  const url = api.uri
  return request.request({
    url: url,
    method: api.method,
    params: data
  })
}