import {TradingMember} from "./TradingMember";

export class Market {
  marketPlaceCode: string | undefined;
  marketPlaceType: string | undefined;
  totalExchangeFees: string | undefined;
  totalGrossAMount: string | undefined;
  totalStampDutyFees: string | undefined;
  vatOnExchangeFees: string | undefined;
  tradingMembers: TradingMember[] | undefined;
  // tradingMembers = new Map<string, Object>();
}
