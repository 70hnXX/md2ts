
/* repairs */
export interface getRepairsReqparamstypes {
  companyIds: number[];
  plateNumber: string;
  coopNameOrPhone: string;
  receptionId: number;
  billNo: string;
  sourceBillNo: string;
  status: number[];
  remark: string;
  startDate: any;
  endDate: any;
  vin: string;
  engineNo: string;
  itemName: string;
  partName: string;
  settleStatus: string;
  enhancedSettlementTypes: string[];
  invoiceTypes: string[];
  invoiceNumber: string;
  page: number;
  pageSize: number
}
    
/* repairs */
export interface RowsType {
  id: number;
  accountSetId: number;
  companyId: number;
  billNo: string;
  billType: string;
  cooperatorId: number;
  status: number;
  receptionId: number;
  billDate: Date;
  remark: string;
  invoiceNumber: string;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
  settlementType: string;
  paymentTypes: string[];
  invoiceType: string;
  taxRate: string;
  amount: string;
  vehicleId: number;
  vehicleSnapshotId: number;
  sourceBillId: number;
  sourceBillType: string;
  sourceBillNo: string;
  financialAuditBy: number;
  financialAuditAt: Date;
  financialAuditRemark: string;
  realNowPayAmount: string;
  realDiscountAmount: string;
  falseNowPayAmount: string;
  falseDiscountAmount: string;
  plateNumber: string;
  cooperatorPhone: string;
  cooperatorName: string;
  companyName: string;
  cooperatorNumber: string;
  financialAuditName: string;
  engineNo: string;
  facBrand: string;
  vehicleGroup: string;
  receptionName: string;
  settleStatus: string
}
        
/* repairs */
export interface getRepairsResbodytypes {
  Rows: RowsType[];
  totalSize: number;
  totalPage: number;
  totalAmount: string
}
    