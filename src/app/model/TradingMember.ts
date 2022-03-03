import {TradingClient} from "./TradingClient";

export class TradingMember {
  totalBrokerageFees: string | undefined;
  totalExchangeFees: string | undefined;
  totalGrossAmount: string | undefined;
  totalStampDutyFees: string | undefined;
  tradingMemberCode = '';
  vatOnBrokerageFees: string | undefined;
  tradingClients: TradingClient[] | undefined;
  // tradingClients = new Map<string, Object>();
}
