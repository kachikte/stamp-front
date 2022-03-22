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
  selector: 'app-market-dashboard',
  templateUrl: './market-dashboard.component.html',
  styleUrls: ['./market-dashboard.component.css']
})
export class MarketDashboardComponent implements OnInit {
  tcTotalExchangeFees = 0;

  tTotalPrice = 0;
  tTotalGrossTradeAmount = 0;

  name = localStorage.getItem('name');
  role = localStorage.getItem('role');

  marketPlaceData;
  marketData = new Market();

  tradingMembersArr: any[] = [];
  tradingClientsArr: any[] = [];
  tradesArr: any[] = [];
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

  tradingClient: any;
  trade: any;

  tmLength = 0;
  tcLength = 0;
  tLength = 0;
  pLength = 0;

  markets = [];


  private showSuccess: boolean;

  constructor(private router: Router, private dataSer: DataService) {
  }

  ngOnInit() {

    if (localStorage.getItem('role') === 'superAdmin') {
      this.markets = this.dataSer.getAdminMarket();
    } else if (localStorage.getItem('role') === 'tradingMember') {
      this.markets = this.dataSer.getTradingMarketSelection(localStorage.getItem('name'));
    } else if (localStorage.getItem('role') === 'tradingClient') {
      this.markets = this.dataSer.getClientMarketSelection(localStorage.getItem('name'));
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

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.dataS;
    this.salesChart.update();
  }

  submitMarketCode(mark: string) {
    localStorage.removeItem('marketCode');
    localStorage.setItem('marketCode', mark);
    this.router.navigate(['/dashboard']);
  }

}
