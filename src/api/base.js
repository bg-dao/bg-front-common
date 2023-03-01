import request from "@/utils/request"

const base_url = "/api/base/normal"

/** 查询实时统计数据 */
export function queryRealData(params) {
  return request({
    url: `${base_url}/queryRealData`,
    method: "get",
    params,
  })
}
