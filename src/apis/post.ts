import type { HttpOption } from '@/composables/useHttp'
import type { PostItem } from '@/types/index'

enum Api {
  post = '/post',
  hotPost = '/post/hot',
  allTags = '/post/tags',
}
export const getPost = async (option?: HttpOption<PostItem>) => {
  return await useHttp.get(Api.post, {}, option)
}

export const getHotPost = async (option?: HttpOption<PostItem[]>) => {
  return await useHttp.get(Api.hotPost, {}, option)
}

export const getAllTags = async (option?: HttpOption<string[]>) => {
  return await useHttp.get(Api.allTags, {}, option)
}
