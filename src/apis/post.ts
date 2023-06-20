import type { HttpOption } from '@/composables/useHttp'
// import type { PostItem } from '@/types/index'

export interface PostItem {
  _id: string
  createdAt: string
  updateAt: string
  isPublic: boolean
  lastModifiedDate: string
  like: number
  posterUrl: string
  pv: number
  summary: string
  tags: Array<string>
  title: string
  content: string
  prev: PostItem | null
  next: PostItem | null
}
enum Api {
  POST = '/post',
  HOT_POST = '/post/hot',
  ALL_TAGS = '/post/tags',
  ARCHIVE = '/post/archive',
  SEARCH_POST = '/post/search',
  SEARCH_POST_BY_TAG = '/post/searchTag',
  UPDATE_PV = '/post/updatePv',
  UPDATE_LIKE = '/post/updateLike',
}
export const getPost = async (option: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.POST, {}, option!)
}

export const postDetail = async ({ _id }: { _id: string }, option?: HttpOption<PostItem>) => {
  // console.log('fetchPostdetail1')
  return await useHttp.get(`${Api.POST}/${_id}`, {}, option!)
}

export const getHotPost = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.HOT_POST, {}, option!)
}

export const getAllTags = async (option?: HttpOption<{ tags: [] }>) => {
  return await useHttp.get(Api.ALL_TAGS, {}, option!)
}

export const getArchive = async (option?: HttpOption<{ tags: [] }>) => {
  return await useHttp.get(Api.ARCHIVE, {}, option!)
}

export const searchPost = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.SEARCH_POST, {}, option!)
}

export const searchPostByTag = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.SEARCH_POST_BY_TAG, {}, option!)
}

export const updatePv = async ({ _id }: { _id: string }, option?: HttpOption<[]>) => {
  return await useHttp.put(Api.UPDATE_PV, { postId: _id }, option!)
}

export const updateLike = async ({ _id }: { _id: string }, option?: HttpOption<PostItem>) => {
  return await useHttp.put(Api.UPDATE_LIKE, { postId: _id }, option!)
}
