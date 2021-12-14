# 版本列表<br>GET /versions

## Query参数说明
```json5
{
  "keyword": "",	 # 关键字
  "*releaseDateStart": null,	 # 发布开始日期，不传不过滤
  "*releaseDateEnd": null,	 # 发布结束日期，不传不过滤
  "page": 0,	 # 页码
  "pageSize": 0	 # 页大小
}
```

## 返回体说明（application/json）
```json5
{
  "code": "",	 # ok表示成功，其他表示错误代码
  "message": "",	 # 与code对应的描述信息
  "data": {	 # 返回的数据
    "rows": [	 # 数据
      {
        "fullVersion": "",	 # 版本全名称
        "id": 0,	 # 主键ID
        "version1": 0,	 # 一级版本号，必须大于0
        "version2": 0,	 # 二级版本号，不能小于0
        "version3": 0,	 # 三级版本号，不能小于0
        "version4": 0,	 # 四级版本号，不能小于0
        "doc": "",	 # 版本更新内容文档，不能空
        "releaseDate": null	 # 发布日期
      }
    ],
    "totalSize": 0,
    "totalPage": 0
  }
}
```
