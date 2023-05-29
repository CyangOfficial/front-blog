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
}
enum Api {
  POST = '/post',
  HOT_POST = '/post/hot',
  ALL_TAGS = '/post/tags',
  SEARCH_POST = '/post/search',
  SEARCH_POST_BY_TAG = '/post/searchTag',
}
export const getPost = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.POST, {}, option!)
}

export const postDetail = async ({ _id }: { _id: string }, option?: HttpOption<PostItem>) => {
  return await useHttp.get(`${Api.POST}/${_id}`, {}, option!)
}

export const getHotPost = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.HOT_POST, {}, option!)
}

export const getAllTags = async (option?: HttpOption<string[]>) => {
  return await useHttp.get(Api.ALL_TAGS, {}, option!)
}

export const searchPost = async (option?: HttpOption<PostItem>) => {
  return await useHttp.get(Api.SEARCH_POST, {}, option!)
}

export const searchPostByTag = async (option?: HttpOption<PostItem>) => {
  return await useHttp.get(Api.SEARCH_POST_BY_TAG, {}, option!)
}
