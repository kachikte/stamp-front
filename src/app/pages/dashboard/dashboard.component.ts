import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
// @ts-ignore
import {Market} from '../../model/Market';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';
import {Party} from '../../model/Party';
import {Router} from '@angular/router';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {
  marketCodeGlobal = localStorage.getItem('marketCode');
  tempMemCodeGlobal = localStorage.getItem('tempMem');
  tcTotalExchangeFees = 0;

  tTotalPrice = 0;
  tTotalGrossTradeAmount = 0;

  name = localStorage.getItem('name');
  role = localStorage.getItem('role');

  marketPlaceData;
  marketData = new Market();

  tradingMembersArr: any[] = [];
  tradingClientsArr: any[] = [];
  tradingClientsSet: Set<any>;
  tradesArr: any[] = [];
  acctTradesArr: any[] = [];
  accountTradeSet: Set<any>;
  tradeSet: Set<any>;
  partiesArr: any[] = [];
  partiesSet: Set<any>;

  tradingClients: TradingClient[] = [];

  trades: Trade[] = [];

  parties: Party[] = [];

  code = '';

  selIndicator = 0;


  public datasets: any;
  public dataS: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  tradingMember: any;
  tradingClient: any;
  trade: any;

  tmLength = 0;
  tcLength = 0;
  acLength = 0;
  tLength = 0;
  pLength = 0;


  public payPalConfig?: IPayPalConfig;
  private showSuccess: boolean;

  constructor(private router: Router, private dataSer: DataService) {
  }


  ngOnInit() {
    // this.addStakeholder();
    // this.getDataRespectively();

    this.dataSer.getSelectionData();

    if (this.role === 'superAdmin') {
      this.selIndicator = 0;
      this.tradingMembersArr = this.dataSer.tradingMembersArr;
      this.tmLength = this.dataSer.getTradingMembers().length;
      this.tradingClientsArr = this.dataSer.tradingClientsArr;
      this.tcLength = this.dataSer.getTradingClients().length;
      this.acLength = this.dataSer.getAccountTrades().length;
      this.acctTradesArr = this.dataSer.accountTradesArr;
      this.tradesArr = this.dataSer.tradesArr;
      console.log('TRAAAAAAAAAAAAAADD');
      console.log(this.dataSer.tradesArr);
      this.tLength = this.dataSer.getTrades().length;
      this.partiesArr = this.dataSer.partiesArr;
      this.pLength = this.dataSer.getParties().length;
    } else if (this.role === 'tradingMember') {
      this.selIndicator = 1;
      this.tradingMember = this.getTradingMemberDetail();
      this.tradingClientsSet = this.dataSer.getTradingMemberSelectionData(this.name);
    } else if (this.role === 'tradingClient') {
      this.selIndicator = 3;
      this.tradingClient = this.getTradingClientDetail();
      this.accountTradeSet = this.dataSer.getTradingClientSelectionData(this.name);
    }

  }

  public loadScript(url: any) {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  setCode(cd: string) {
    this.code = cd;
    console.log('This is the selection code');
    console.log(this.code);
  }

  getIndicator(idc: string) {
    this.selIndicator = +idc;
  }

  getTradingMemberDetail() {
    const tradingMemberCode = localStorage.getItem('name');
    return this.dataSer.getSpecificTradingMember(tradingMemberCode);
  }

  getTradingClientDetail() {
    const identifier = localStorage.getItem('name');
    return this.dataSer.getSpecificTradingClient(identifier);
  }

  getTradeDetail() {
    const securityCode = localStorage.getItem('name');
    return this.dataSer.getSpecificTrade(securityCode);
  }

  back() {
    if (this.role === 'superAdmin' || this.role === 'tradingMember') {
      this.router.navigate(['market-dashboard']);
    } else if (this.role === 'tradingClient') {
      this.router.navigate(['member-dashboard']);
    }
  }

}
