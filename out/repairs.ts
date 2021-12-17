
/* 综合查询-退工单 */
export async function getSearch-list(params) {
  return request({
    module: "erp",
    url: "/repairs/bill-returns/search-list",
    method: "GET",
    params
  })
}
  