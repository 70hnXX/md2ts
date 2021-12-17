
/* 版本列表 */
export interface getVersionsReqInterface {
  keyword?: string;
  releaseDateStart?: any;
  releaseDateEnd?: any;
  page?: number;
  pageSize?: number
}

/* 发布版本信息 */
export interface postVersionsReqInterface {
  version1?: number;
  version2?: number;
  version3?: number;
  version4?: number;
  doc?: string
}

/* 更新版本信息 */
export interface putVersionsReqInterface {
  id?: number;
  doc?: string
}
