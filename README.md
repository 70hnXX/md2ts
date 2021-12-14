### md2tsParser

后端的 API 接口文档是 markdown 格式的,所以我写了这个 markdown 文件转 typescript 的工具.

## 使用

将以下命令添加到 package.json:

```
"scripts": {
  "parse": "ts-node index.js --i ./in --o ./out"
},
```

文档路径`./in`,输出路径`./out`
运行`yarn parse`

## 示例

GET.md

```
# 接口示例<br>GET /example

## Query参数说明
{
  "keyword": "",
  "releaseDateStart": null,
  "releaseDateEnd": null,
  "page": 0,
  "pageSize": 0
}

返回体说明（application/json）

{
  code: "",
  message: "",
  data: {
    rows: [
      {
        fullVersion: "",
        id: 0,
        doc: "",
      },
    ],
    totalSize: 0,
    totalPage: 0,
  },
}

```

example.ts

```
import request from "@/utils/request";

/* 列表 */
export async function getList(params) {
  return request({
    module: "erp",
    url: "/example",
    method: "GET",
    params
  })
}
```
