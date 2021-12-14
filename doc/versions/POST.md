# 发布版本信息<br>POST /versions

## 请求体说明（application/json）
```json5
{
  "version1": 0,	 # 一级版本号
  "version2": 0,	 # 二级版本号
  "version3": 0,	 # 三级版本号
  "version4": 0,	 # 四级版本号
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
