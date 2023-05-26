// 文章
export interface PostItem {
  _id: string;
  createdAt: string;
  updateAt: string;
  isPublic: boolean;
  lastModifiedDate: string;
  like: number;
  posterUrl: string;
  pv: number;
  summary: string;
  tags: Array<string>;
  title: string;
}