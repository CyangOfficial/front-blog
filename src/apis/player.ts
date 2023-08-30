import type { HttpOption } from '@/composables/useHttp'
// import type { PostItem } from '@/types/index'

export interface MusicItem {
  _id: string
  title: string
  artist: string
  lrc: string
  coverUrl: string
  musicUrl: string
  isPublic: boolean
}
enum Api {
  BASIC_PREFIX = '/player',
}

// 音乐详情
export const musicDetail = async ({ _id }: { _id: string }, option?: HttpOption<MusicItem>) => {
  return await useHttp.get(`${Api.BASIC_PREFIX}/${_id}`, {}, option!)
}

// 音乐列表
export const getMusicList = async (option?: HttpOption<MusicItem[]>) => {
  return await useHttp.get(Api.BASIC_PREFIX, {}, option!)
}
