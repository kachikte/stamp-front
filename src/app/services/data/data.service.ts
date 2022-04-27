import {EventEmitter, Injectable, Output, SimpleChanges} from '@angular/core';
import * as data from '../../../assets/data/data.json';
import * as dataOne from '../../../assets/data/dataOne.json';
import * as usrs from '../../../assets/data/user-details.json';
import {Party} from '../../model/Party';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  markt: string;
  market = localStorage.getItem('role') === 'superAdmin' ? dataOne : data;
  // market = data;

  usr = usrs;
  tradingMembersArr: any[] = [];
  tradingClientsArr: any[] = [];
  accountTradesArr: any[] = [];
  tradesArr: any[] = [];
  partiesArr: any[] = [];

  constructor(private http: HttpClient) {
    this.getStakeHolderProfile('sisb@sisb.com');
    this.getContractNotesTaxable('sisb@sisb.com', 'SISB', 'NGX', 'MARCH 2022');
  }

  getAdminMarket() {
    const marketAdArr = [];
    // @ts-ignore
    for (const market of this.market.marketData.market) {
      marketAdArr.push(market.marketPlaceCode);
    }

    return marketAdArr;
  }

  getTradingMarketSelection(code: string) {

    const marketTmArr = [];
    // @ts-ignore
    for (const market of this.market.marketData.market) {
      for (const tradingMember of market.tradingMembers) {
        if (code.toLowerCase() === tradingMember.tradingMemberCode.toLowerCase()) {
          marketTmArr.push(market.marketPlaceCode);
          console.log('MARKETTTSSSS');
          console.log(market.marketPlaceCode);
        }
      }
    }

    return marketTmArr;
  }

  getClientMarketSelection(identifier: string) {

    const marketTcArr = [];
    // @ts-ignore
    for (const market of this.market.marketData.market) {
      for (const tradingMember of market.tradingMembers) {
        for (const tradingClient of tradingMember.tradingClients) {
          if (identifier.toLowerCase() === tradingClient.identifier.toLowerCase()) {
            marketTcArr.push(market.marketPlaceCode);
            console.log('MARKETTTSSSS');
            console.log(market.marketPlaceCode);
          }
        }
      }
    }

    return marketTcArr;
  }

  getClientTradingMemberSelection(identifier: string) {

    const tmTcArr = [];
    // @ts-ignore
    for (const market of this.market.marketData.market) {
      for (const tradingMember of market.tradingMembers) {
        for (const tradingClient of tradingMember.tradingClients) {
          if (identifier.toLowerCase() === tradingClient.identifier.toLowerCase()) {
            tmTcArr.push(tradingMember.tradingMemberCode);
            console.log('TRADING MEMMMMMMM');
            console.log(tradingMember.tradingMemberCode);
          }
        }
      }
    }

    return tmTcArr;
  }

  getDataAl() {
    return this.market;
  }

  getData() {
    const marketData: any[] = [];
    // @ts-ignore
    for (const market of this.market.marketData.market) {
      console.log('ggggggggataaaaaaaaaaaaaaaaa');
      console.log(market);
      if (market.marketPlaceCode.toLowerCase() === localStorage.getItem('marketCode').toLowerCase()) {
        marketData.push(market);
      }
    }
    return marketData;
  }

  getUsers() {
    return this.usr;
  }

  getSelectionData() {

    console.log('dataaaaaaaaaaaaaaaaa');
    console.log(this.getData());

    const tradingMembers = [];

    const datar = this.getData();

    // @ts-ignore
    for (const market of datar) {
      for (const tradingMember of market.tradingMembers) {

        for (const tradingClient of tradingMember.tradingClients) {

          for (const accountTrade of tradingClient.accountTrades) {

            for (const trade of accountTrade.trades) {

              const parties = [];
              for (const party of trade.parties) {
                const part = new Party();
                part.partyId = party.partyId;
                part.partyRole = party.partyRole;
                parties.push(part);
                this.partiesArr.push(party.partyId);
              }
              this.tradesArr.push(trade.securityCode);
            }

            console.log('tradeeeeesssss');
            console.log(this.tradesArr);

            this.accountTradesArr.push(accountTrade.accountNumber);
          }
          console.log('accccoooouuuunnnnnntttts');
          console.log(this.accountTradesArr);

          this.tradingClientsArr.push((tradingClient.fistName.toUpperCase()).concat(' ').concat(tradingClient.lastName.toUpperCase()));
        }

        console.log('cllllliiiiieeeennnnttttsss');
        console.log(this.tradingClientsArr);

        tradingMembers.push(tradingMember.tradingMemberCode);
      }
    }
    console.log('meeeeeeemmmmmmm');
    console.log(this.tradingMembersArr);

    this.tradingMembersArr = tradingMembers;
    this.tradingMembersArr.push('Select ...');

    const tradingMemberSet = new Set(this.tradingMembersArr);
    // @ts-ignore
    this.tradingMembersArr = tradingMemberSet;
    // this.tml = tradingMemberSet.size;


    this.tradingClientsArr.push('Select ...');
    const tradingClientSet = new Set(this.tradingClientsArr);
    // @ts-ignore
    this.tradingClientsArr = tradingClientSet;
    // this.tcl = tradingClientSet.size;


    this.accountTradesArr.push('Select ...');
    const accountTradeSet = new Set(this.accountTradesArr);
    // @ts-ignore
    this.accountTradesArr = accountTradeSet;


    this.tradesArr.push('Select ...');
    const tradeSet = new Set(this.tradesArr);
    // @ts-ignore
    this.tradesArr = tradeSet;


    this.partiesArr.push('Select ...');
    const partySet = new Set(this.partiesArr);
    // @ts-ignore
    this.partiesArr = partySet;
  }

  getTradingMembers() {
    // tslint:disable-next-line:prefer-const
    let tradingMembers: any[] = [];

    const datar = this.getData();
    // @ts-ignore
    for (const market of datar) {
      for (const tradingMember of market.tradingMembers) {
        tradingMembers.push(tradingMember);
      }
    }

    return tradingMembers;
  }

  getSpecificTradingMember(tradingMemberCode: string) {
    // tslint:disable-next-line:prefer-const
    let tradingMember: any;
    // @ts-ignore
    for (const tradingMem of this.market.marketData.market[0].tradingMembers) {
      if (tradingMem.tradingMemberCode.toLowerCase() === tradingMemberCode.toLowerCase()) {
        tradingMember = tradingMem;
      }
    }

    return tradingMember;
  }

  getTradingClients() {
    // tslint:disable-next-line:prefer-const
    let tradingClients: any[] = [];
    // @ts-ignore

    const datar = this.getData();
    // @ts-ignore
    for (const market of datar) {
      for (const tradingMember of market.tradingMembers) {
        for (const tradingClient of tradingMember.tradingClients) {
          tradingClients.push(tradingClient);
        }
      }
    }

    return tradingClients;
  }

  getSpecificTradingClient(identifier: string) {
    // tslint:disable-next-line:prefer-const
    let tradingClient: any;
    // @ts-ignore
    for (const tradingMem of this.market.marketData.market[0].tradingMembers) {
      for (const tradingClien of tradingMem.tradingClients) {

        if (tradingClien.identifier === identifier) {
          tradingClient = tradingClien;
        }

      }
    }

    console.log('This is the specific trading client');
    console.log(tradingClient);
    return tradingClient;
  }

  getAccountTrades() {
    // tslint:disable-next-line:prefer-const
    let accountTrades: any[] = [];
    const datar = this.getData();
    // @ts-ignore
    for (const market of datar) {
      for (const tradingMember of market.tradingMembers) {
        for (const tradingClient of tradingMember.tradingClients) {
          for (const accountTrade of tradingClient.accountTrades) {
            accountTrades.push(accountTrade);
          }
        }
      }
    }

    return accountTrades;
  }

  getSpecificAccountTrade(accountNumber: string) {
    // tslint:disable-next-line:prefer-const
    let accountTrade: any;
    // @ts-ignore
    for (const tradingClient of this.getTradingClients()) {
      for (const accTr of tradingClient.accountTrades) {
        if (accTr.accountNumber === accountNumber) {
          accountTrade = accTr;
        }
      }
    }

    return accountTrade;
  }

  getTrades() {
    // tslint:disable-next-line:prefer-const
    let trades: any[] = [];
    // @ts-ignore
    for (const accountTrade of this.getAccountTrades()) {
      for (const trade of accountTrade.trades) {
        trades.push(trade);
      }
    }

    return trades;
  }

  getSpecificTrade(securityCode: string) {
    // tslint:disable-next-line:prefer-const
    let trade: any;
    // @ts-ignore
    for (const accountTrade of this.getAccountTrades()) {
      for (const trad of accountTrade.trades) {
        if (trad.securityCode === securityCode) {
          trade = trad;
        }
      }
    }

    return trade;
  }

  getParties() {
    // tslint:disable-next-line:prefer-const
    let parties: any[] = [];
    // @ts-ignore
    for (const trade of this.getTrades()) {
      for (const party of trade.parties) {
        parties.push(party);
      }
    }

    return parties;
  }

  getTradingMemberSelectionData(tradingMemberCode: string) {

    const tradingMember: any[] = [];
    // @ts-ignore
    for (const tradingMm of this.market.marketData.market[0].tradingMembers) {
      if (tradingMm.tradingMemberCode.toLowerCase() === tradingMemberCode.toLowerCase()) {
        console.log(tradingMm.tradingClients);
        const tradM = tradingMm.tradingClients;
        for (const tradCl of tradM) {
          tradingMember.push(tradCl.fistName.toUpperCase().concat(' ').concat(tradCl.lastName.toUpperCase()));
        }
        break;
      }
    }

    tradingMember.push('Select ...');
    const tradingClientSet = new Set(tradingMember);
    return tradingClientSet;

  }

  getTradingClientSelectionData(identifier: string) {

    const accountTrades: any[] = [];
    // @ts-ignore
    for (const tradingMm of this.market.marketData.market[0].tradingMembers) {
      for (const tradingCc of tradingMm.tradingClients) {
        if (tradingCc.identifier === identifier) {
          for (const trader of tradingCc.accountTrades) {
            accountTrades.push(trader.accountNumber);
          }

          // tradingClient.push(tradingCc.fistName.toUpperCase().concat(' ').concat(tradingCc.lastName.toUpperCase()));
          //
          // console.log('CLIENTSSSS');
          // console.log(tradingClient);
          // break;
        }
      }
    }

    accountTrades.push('Select ...');
    const accountTradeSet = new Set(accountTrades);
    return accountTradeSet;

  }

  // getTradeSelectionData(securityCode: string) {
  //
  //   let k = 0;
  //   const tradesk: any[] = [];
  //   // @ts-ignore
  //   for (const tradingMm of this.market.marketData.market[0].tradingMembers) {
  //     for (const tradingCc of tradingMm.tradingClients) {
  //       for (const tra of tradingCc.trades) {
  //         if (tra.securityCode === securityCode) {
  //           k = 1;
  //           const party = tra.parties;
  //           console.log('PARRRRRTTTIESSS');
  //           console.log(party);
  //           console.log('PARRRRRTTTIESSS');
  //           console.log(tradesk);
  //           for (const par of party) {
  //             tradesk.push(par.partyId);
  //           }
  //         }
  //       }
  //     }
  //   }
  //
  //   tradesk.push('Select ...');
  //   const tradingPartySet = new Set(tradesk);
  //
  //   return tradingPartySet;
  //
  // }


  // getTradingMembersController() {
  //   const url = 'http://50.116.33.99:8080/AnalyticsServices/tradeContractNotes/getTradingMembers?marketCode=' + 'NGX' + '&returnType=json';
  //
  //   console.log(url);
  //     // tslint:disable-next-line:max-line-length
  //   this.http.get(url).subscribe(response => {
  //     console.log(response);
  //   });
  // }

  // getTradingMembersController(marketCode: string) {
  //
  //   const headers = new HttpHeaders()
  //     .append('Content-Type', 'application/json')
  //     // .append('Access-Control-Allow-Headers', 'Content-Type')
  //     .append('Access-Control-Allow-Methods', 'GET')
  //     .append('Access-Control-Allow-Origin', '*');
  //
  //   const url = 'http://localhost:4040/notes/getTradingMembersEx?marketCode=' + marketCode + '&returnType=json';
  //   //   this.http.get(url, {headers}).subscribe(response => {
  //   //     // tslint:disable-next-line:forin
  //   //     for (const responseKey in response) {
  //   //       console.log();
  //   //     }
  //   // });
  //
  //
  //
  //   this.http.get(url, {headers})
  //     .pipe(map(
  //     responseData => {
  //       let postArray: [] = [];
  //       // console.log(responseData['keyValueCollection']);
  //       // tslint:disable-next-line:forin
  //       const vaa = responseData['keyValueCollection'].map(
  //         av =>  av.key
  //       );
  //
  //       // console.log('JUST KEY', vaa);
  //       //
  //       // console.log('ENTIRE COLLECTION', responseData['keyValueCollection']);
  //
  //       postArray = responseData['keyValueCollection'];
  //
  //       return 'a';
  //     }
  //   ))
  //     .subscribe(responseData => {
  //       // console.log(responseData);
  //     });
  // }


  getTradingMembersController(marketCode: string) {

    let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:8080/getTradingMembersEx?marketCode=' + marketCode + '&returnType=json';
    //   this.http.get(url, {headers}).subscribe(response => {
    //     // tslint:disable-next-line:forin
    //     for (const responseKey in response) {
    //       console.log();
    //     }
    // });


    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          // let postArray: [] = [];
          // console.log(responseData['keyValueCollection']);
          // tslint:disable-next-line:forin
          const vaa = responseData['keyValueCollection'].map(
            av => result.push(av)
          );

          // console.log('JUST KEY', vaa);
          //
          // console.log('ENTIRE COLLECTION', responseData['keyValueCollection']);

          result = responseData['keyValueCollection'];
        }
      ))
      .subscribe(responseData => {
        // console.log(responseData);
      });

    return result;
  }


  getStakeHolderProfile(emailAddress: string) {

    // let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:8080/getStakeHolderProfile/?emailAddress=' + emailAddress + '&returnType=json';

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          // tslint:disable-next-line:forin
          // const vaa = responseData['keyValueCollection'].map(
          //   av =>  result.push(av)
          // );
          //
          // result = responseData['keyValueCollection'];

          console.log(responseData);
        }
      ))
      .subscribe(responseData => {
        // console.log(responseData);
      });

    // return result;
  }

  getContractNotesTaxable(emailAddress: string, requesterCode: string, marketCode: string, monthAndYear: string) {

    // let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:8080/getContractNotesTaxable/?emailAddress=' + emailAddress + '&requesterCode=' + requesterCode + '&marketCode=' + marketCode + '&monthAndYear=' + monthAndYear + '&returnType=json';

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          // tslint:disable-next-line:forin
          // const vaa = responseData['keyValueCollection'].map(
          //   av =>  result.push(av)
          // );
          //
          // result = responseData['keyValueCollection'];

          console.log(responseData);
        }
      ))
      .subscribe(responseData => {
        // console.log(responseData);
      });

    // return result;
  }
}
