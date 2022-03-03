import {Trade} from "./Trade";

export class TradingClient {
  accountNumber: string | null | undefined;
  totalBrokerageFees: string | undefined;
  totalCentralSecurityDepositFees: string | undefined;
  totalExchangeFees: string | undefined;
  totalGrossAmount: string | undefined;
  totalSecFees: string | undefined;
  totalStampDutyFees: string | undefined;
  totalTradeAlertFees: string | undefined;
  trades: Trade[] | undefined;
  // trades = new Map<string, Object>();
}
