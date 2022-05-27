import {EventEmitter, Injectable, Output, SimpleChanges} from '@angular/core';
import * as data from '../../../assets/data/data.json';
import * as dataOne from '../../../assets/data/dataOne.json';
import * as usrs from '../../../assets/data/user-details.json';
import {Party} from '../../model/Party';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Subject} from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  marketService: any = {};

  loginData: Subject<any> = new Subject<any>();

  signUpData: Subject<any> = new Subject<any>();

  marketType: string;

  marketChange: Subject<string> = new Subject<string>();

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
    // this.getStakeHolderProfile('sisb@sisb.com');
    // this.getContractNotesTaxable('sisb@sisb.com', 'SISB', 'NGX', 'MARCH 2022');
    this.marketChange.subscribe(value => {
      this.marketType = value;
    });
  }

  toggleMarketChange(marketCode: string) {
    this.marketChange.next(marketCode);
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
    this.marketService = JSON.parse(localStorage.getItem('portalData'));

    const marketData: any[] = [];
    // @ts-ignore
    // for (const market of this.market.marketData.market) {
    for (const market of this.marketService['market']) {
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

    const markRec = this.getData();
    // @ts-ignore
    // for (const tradingMem of this.market.marketData.market[0].tradingMembers) {
    for (const tradingMem of markRec[0].tradingMembers) {


      console.log('START DEBUGGING ', tradingMem);

      // console.log('START DEBUGGING ONE', this.getData());

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

    const markRec = this.getData();
    // @ts-ignore
    // for (const tradingMm of this.market.marketData.market[0].tradingMembers) {
    for (const tradingMm of markRec[0].tradingMembers) {
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
        }
      }
    }

    accountTrades.push('Select ...');
    const accountTradeSet = new Set(accountTrades);
    return accountTradeSet;

  }

  getTradingMembersController(marketCode: string) {

    let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:7070/getTradingMembersEx?marketCode=' + marketCode + '&returnType=json';

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          const vaa = responseData['keyValueCollection'].map(
            av => result.push(av)
          );

          result = responseData['keyValueCollection'];
        }
      ))
      .subscribe(responseData => {
      });

    return result;
  }

  // tslint:disable-next-line:max-line-length
  stakeHolderRegistration(marketCode: string, requesterCode: string, password: string, confirmPassword: string, secretQuestion: string, answer: string) {

    // let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    // tslint:disable-next-line:max-line-length
    const url = 'http://localhost:7070/stakeholderRegistration/?marketCode=' + marketCode + '&requesterCode=' + requesterCode + '&passWord=' + password + '&confirmPassWord=' + confirmPassword + '&secretQuestion=' + secretQuestion + '&answer=' + answer;

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {

          console.log('SignUp Data ', responseData);

          this.signUpData.next(responseData);
        }
      ))
      .subscribe(responseData => {
      });
  }

  getStakeHolderProfile(emailAddress: string, password: string) {

    // let result = [];

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:7070/getStakeHolderProfile/?emailAddress=' + emailAddress + '&password=' + password + '&returnType=json';

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          // tslint:disable-next-line:forin
          // const vaa = responseData['keyValueCollection'].map(
          //   av =>  result.push(av)
          // );
          //
          // result = responseData['keyValueCollection'];

          console.log('Login Data ', responseData);

          this.loginData.next(responseData);
        }
      ))
      .subscribe(responseData => {
        // console.log(responseData);
      });

    // return result;
  }

  getContractNotesTaxable(emailAddress: string, requesterCode: string, marketCode: string, monthAndYear: string) {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:7070/getContractNotesTaxable/?emailAddress=' + emailAddress + '&requesterCode=' + requesterCode + '&marketCode=' + marketCode + '&monthAndYear=' + monthAndYear;

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          console.log('EMAIL ', emailAddress);
          console.log('REQUESTER ', requesterCode);
          console.log('MARKET ', marketCode);
          console.log('MONTH YEAR ', monthAndYear);
          console.log('PORTAL DATA =====> ', responseData);


          localStorage.setItem('portalData', JSON.stringify(responseData));

        }
      ))
      .subscribe(responseData => {
      });
  }

  // tslint:disable-next-line:max-line-length
  getPaymentDetails(emailAddress: string, requesterCode: string, marketCode: string, monthAndYear: string, paymentReference: string, paymentValue: number) {

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    // tslint:disable-next-line:max-line-length
    const url = 'http://localhost:7070/getPaymentDetails/?emailAddress=' + emailAddress + '&requesterCode=' + requesterCode + '&marketCode=' + marketCode + '&monthAndYear=' + monthAndYear + '&paymentReference=' + paymentReference + '&paymentValue=' + paymentValue;

    this.http.get(url, {headers})
      .pipe(map(
        responseData => {
          console.log('EMAIL ', emailAddress);
          console.log('REQUESTER ', requesterCode);
          console.log('MARKET ', marketCode);
          console.log('MONTH YEAR ', monthAndYear);
          console.log('PAYMENT REFERENCE DATA =====> ', paymentReference);
        }
      ))
      .subscribe(responseData => {
      });
  }

  setReport() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      // .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const body = {
      'reportType': 'pdf',
      'certificateNumber': 'certificateNumber',
      'instrument': 'instrument',
      'parties': 'parties',
      'consideration': 'consideration',
      'stampDutyPaid': 'stampDutyPaid',
      'issd': 'issd',
      'beneficiary': 'beneficiary',
      'beneficiaryTin': 'beneficiaryTin',
      'decription': 'decription',
      'dateOfExecution': 'dateOfExecution',
      'dateOfFiling': 'dateOfFiling',
      'issuanceDate': 'issuanceDate',
      'originatingOffice': 'originatingOffice',
      'emailAddress': 'emailAddress',
      'tmCode': 'tmCode',
      'month': 5,
      'year': '2022'
    };

    const url = 'http://localhost:7070/getReport/';

    this.http.post<any>(url, body, {headers}).subscribe({});
  }


  getReport() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*');

    const url = 'http://localhost:7070/downloadReport/?emailAddress=sisb@sisb-mail.com&tmCode=SISB&month=5&year=2022';

    this.http.get<any>(url, {headers, responseType: 'blob' as 'json'}).subscribe(blob => saveAs(blob, localStorage.getItem('name') + '-certificate.pdf'));
  }
}
