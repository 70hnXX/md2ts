import request from "@/utils/request";
      
/* 版本列表 */
export async function getVersions(params) {
  return request({
    module: "erp",
    url: "/versions",
    method: "GET",
    params
  })
}
  
/* 发布版本信息 */
export async function postVersions(data) {
  return request({
    module: "erp",
    url: "/versions",
    method: "POST",
    data
  })
}
  
/* 更新版本信息 */
export async function putVersions(data) {
  return request({
    module: "erp",
    url: "/versions",
    method: "PUT",
    data
  })
}
  