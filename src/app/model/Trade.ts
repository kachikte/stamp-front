import {Party} from "./Party";

export  class Trade {
  executionId: string | undefined;
  securityCode: string | undefined;
  securityType: string | undefined;
  marketSegmentId: string | undefined;
  quantity: number | undefined;
  price: string | undefined;
  transactionTime: string | undefined;
  settlementDate: string | undefined;
  numberOfSide: number | undefined;
  grossTradeAmount: string | undefined;
  side: string | undefined;
  orderId: string | undefined;
  clientOrderId: string | null | undefined;
  accountNumber: string | null | undefined;
  // parties = new Map<string, Object>();
  parties: Party[] | undefined;
  secFee: string | undefined;
  centralSecurityDepositFee: string | undefined;
  tradeAlertFee: string | undefined;
  stampDutyFee: string | undefined;
  brokerageFee: string | undefined;
  exchangeFee: string | undefined;
}
