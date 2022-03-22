import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
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

    if (localStorage.getItem('role') === 'superAdmin') {
      this.selIndicator = 0;
      this.tradingMembersArr = this.dataSer.tradingMembersArr;
      this.tmLength = this.dataSer.getTradingMembers().length;
      this.tradingClientsArr = this.dataSer.tradingClientsArr;
      this.tcLength = this.dataSer.getTradingClients().length;
      this.tradesArr = this.dataSer.tradesArr;
      this.tLength = this.dataSer.getTrades().length;
      this.partiesArr = this.dataSer.partiesArr;
      this.pLength = this.dataSer.getParties().length;
    } else if (localStorage.getItem('role') === 'tradingMember') {
      this.selIndicator = 1;
      this.tradingMember = this.getTradingMemberDetail();
      this.tradingClientsSet = this.dataSer.getTradingMemberSelectionData(localStorage.getItem('name'));
    } else if (localStorage.getItem('role') === 'tradingClient') {
      this.selIndicator = 2;
      this.tradingClient = this.getTradingClientDetail();
      this.tradeSet = this.dataSer.getTradingClientSelectionData(localStorage.getItem('name'));
    } else if (localStorage.getItem('role') === 'trade') {
      this.selIndicator = 3;
      this.trade = this.getTradeDetail();
      this.partiesSet = this.dataSer.getTradeSelectionData(localStorage.getItem('name'));
    }


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.dataS = this.datasets[0];


    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    const chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      // tslint:disable-next-line:indent
      type: 'line',
      // tslint:disable-next-line:indent
      options: chartExample1.options,
      // tslint:disable-next-line:indent
      data: chartExample1.data
      // tslint:disable-next-line:indent
    });

  }

  public loadScript(url: any) {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  setCode(cd: string) {
    this.code = cd;
    console.log(this.code);
  }

  getIndicator(idc: string) {
    this.selIndicator = +idc;
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.dataS;
    this.salesChart.update();
  }

  getTradingMemberDetail() {
    const tradingMemberCode = localStorage.getItem('name');
    return this.dataSer.getSpecificTradingMember(tradingMemberCode);
  }

  getTradingClientDetail() {
    const accountNumber = localStorage.getItem('name');
    return this.dataSer.getSpecificTradingClient(accountNumber);
  }

  getTradeDetail() {
    const securityCode = localStorage.getItem('name');
    return this.dataSer.getSpecificTrade(securityCode);
  }

  back() {
    this.router.navigate(['market-dashboard']);
  }

}
