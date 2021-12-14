# 更新版本信息<br>PUT /versions

## 请求体说明（application/json）
```json5
{
  "id": 0,	 # 主键ID
  "doc": ""	 # 版本更新内容文档
}
```

## 返回体说明（application/json）
```json5
{
  "code": "",	 # ok表示成功，其他表示错误代码
  "message": ""	 # 与code对应的描述信息
}
```
