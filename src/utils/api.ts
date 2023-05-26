import Http from './request2'

interface Post {
  page: number
  pageSize: number
}
export function getPost(params = {}, options?: any) {
  return Http.get('/post', params, options)
}

export function getItemPost({ _id }: { _id: string }, options?: any) {
  return Http.get(`/post/${_id}`, {}, options)
}

export function searchPost(params: Post, options?: any) {
  return Http.get('/post/search', params, options)
}

export function searchPostByTag(params: Post, options?: any) {
  return Http.get('/post/searchTag', params, options)
}

export function getHotPost(params = {}, options?: any) {
  return Http.get('/post/hot', params, options)
}

export function getAllTags(params = {}, options?: any) {
  return Http.get('/post/tags', params, options)
}

export function updatePv({ _id }: { _id: string }, options?: any) {
  return Http.put('/post/updatePv', { postId: _id }, options)
}
