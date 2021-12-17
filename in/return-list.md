# 综合查询-退工单<br>GET /repairs/bill-returns/search-list

## Query 参数说明

```json5
{
  "companyIds": [	 # 分公司ID
    0
  ],
  "plateNumber": "",	 # 车牌号
  "coopNameOrPhone": "",	 # 客户名称/电话
  "receptionId": 0,	 # 接待顾问ID
  "billNo": "",	 # 退工单号
  "sourceBillNo": "",	 # 原单据单号
  "status": [	 # 退工单状态
    0
  ],
  "remark": "",	 # 退工单备注
  "startDate": null,	 # 退工日期-开始
  "endDate": null,	 # 退工日期-结束
  "vin": "",	 # 车架号
  "engineNo": "",	 # 发动机号
  "itemName": "",	 # 服务项目名称
  "partName": "",	 # 材料名称
  "settleStatus": "",	 # 结算状态:已结清：settled,未结清：unsettle
  "enhancedSettlementTypes": [	 # 结算方式
    ""
  ],
  "invoiceTypes": [	 # 发票类型
    ""
  ],
  "invoiceNumber": "",	 # 发票号
  "page": 0,
  "pageSize": 0
}
```

## 返回体说明（application/json）

```json5
{
  "code": "",	 # ok表示成功，其他表示错误代码
  "message": "",	 # 与code对应的描述信息
  "data": {	 # 返回的数据
    "Rows": [
      {
        "id": 0,	 # 自增ID
        "accountSetId": 0,	 # 账套ID
        "companyId": 0,	 # 公司ID
        "billNo": "",	 # 单据号
        "billType": "",	 # 单据类型
        "cooperatorId": 0,	 # 往来单位ID[退工客户]
        "status": 0,	 # 状态：1-待提交，2-待库房处理，3-待财务结算，4-已完成
        "receptionId": 0,	 # 接待人
        "billDate": "0001-01-01T00:00:00Z",	 # 退工时间
        "remark": "",	 # 单据备注
        "invoiceNumber": "",	 # 发票号
        "createdBy": 0,	 # 创建者员工ID
        "*createdAt": "0001-01-01T00:00:00Z",	 # 创建时间
        "updatedBy": 0,	 # 更新者员工ID
        "*updatedAt": "0001-01-01T00:00:00Z",	 # 更新时间
        "settlementType": "",	 # 结算方式：现付、挂账、代收、量子金贷
        "paymentTypes": [	 # 支付方式
          ""
        ],
        "invoiceType": "",	 # 发票类型
        "taxRate": "0",	 # 税率
        "amount": "0",	 # 退工金额
        "vehicleId": 0,	 # 车辆档案ID
        "vehicleSnapshotId": 0,	 # 车辆档案快照ID
        "sourceBillId": 0,	 # 原单据ID
        "sourceBillType": "",	 # 原单据类型
        "sourceBillNo": "",	 # 原单据单号
        "financialAuditBy": 0,	 # 结算审核人ID
        "*financialAuditAt": "0001-01-01T00:00:00Z",	 # 结算审核时间
        "financialAuditRemark": "",	 # 结算审核备注
        "realNowPayAmount": "0",	 # 累计实账现付金额
        "realDiscountAmount": "0",	 # 累计实账优惠金额
        "falseNowPayAmount": "0",	 # 累计虚账现付金额
        "falseDiscountAmount": "0",	 # 累计虚账优惠金额
        "plateNumber": "",	 # 快照的车牌号
        "cooperatorPhone": "",	 # 客户电话
        "cooperatorName": "",	 # 客户姓名
        "companyName": "",	 # 分公司名称
        "cooperatorNumber": "",	 # 客户编号
        "financialAuditName": "",	 # 财务确认人名称
        "engineNo": "",	 # 发动机号
        "facBrand": "",	 # 厂牌
        "vehicleGroup": "",	 # 车型组
        "receptionName": "",	 # 接待顾问名称
        "settleStatus": ""	 # 结算状态:已结清：settled,未结清：unsettle
      }
    ],
    "totalSize": 0,
    "totalPage": 0,
    "totalAmount": "0"	 # 合计退工金额
  }
}
```
