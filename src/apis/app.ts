import type { HttpOption } from '@/composables/useHttp'
// import type { PostItem } from '@/types/index'

export interface ICover {
  _id: string
  title: string
  coverUrl: string
  weight: number
  isPublic: boolean
}

enum Api {
  COVER_API = '/cover',
}

// 获取首页封面
export const getHomeCover = async (option?: HttpOption<ICover[]>) => {
  return await useHttp.get(Api.COVER_API, {}, option!)
}
