import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
// @ts-ignore
import * as data from '../../../assets/data/data.json';
import {Market} from '../../model/Market';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';
import {Party} from '../../model/Party';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  marketPlaceData = data;
  marketData = new Market();

  tradingMembersArr: any[] = [];
  tradingClientsArr: any[] = [];
  tradesArr: any[] = [];

  tradingClients: TradingClient[] = [];

  trades: Trade[] = [];

  parties: Party[] = [];

  code = '';

  selIndicator = 0;

  tml = 0;
  tcl = 0;
  tl = 0;
  pl = 0;



  public datasets: any;
  public dataS: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  ngOnInit() {
    this.getDataRespectively();

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



  getDataRespectively() {
    console.log('==========This is the data================');
    // @ts-ignore
    this.loadScript('assets/js/Collapsible-Data-Grid-Plugin-With-jQuery-Treegrid/dist/js/jquery.treegrid.min.js');
    this.loadScript('assets/js/custom-init.js');

    const tradingMembers = [];
    // @ts-ignore
    for (const tradingMember of this.marketPlaceData.marketData.market.tradingMembers) {
      for (const tradingClient of tradingMember.tradingClients) {

        for (const trade of tradingClient.trades) {

          const parties = [];
          for (const party of trade.parties) {
            const part = new Party();
            part.partyId = party.partyId;
            // console.log(party.partyId);
            // part.partyIdSource = party.partyIdSource;
            // console.log(party.partyIdSource);
            part.partyRole = party.partyRole;
            // console.log(party.partyRole);

            // this.partiesArr.push(part);
            parties.push(part);
          }
          this.pl = parties.length;

          this.tradesArr.push(trade.securityCode);
        }

        this.tradingClientsArr.push(tradingClient.accountNumber);
      }

      tradingMembers.push(tradingMember.tradingMemberCode);
    }

    this.tradingMembersArr = tradingMembers;
    // console.log(this.tradingMembersArr);

    const tradingMemberSet = new Set(this.tradingMembersArr);
    // @ts-ignore
    this.tradingMembersArr = tradingMemberSet;
    this.tml = tradingMemberSet.size;


    const tradingClientSet = new Set(this.tradingClientsArr);
    // @ts-ignore
    this.tradingClientsArr = tradingClientSet;
    this.tcl = tradingClientSet.size;


    const tradeSet = new Set(this.tradesArr);
    // @ts-ignore
    this.tradesArr = tradeSet;
    this.tl = tradeSet.size;

    // console.log('=======OVERALL TRADES========');

    // console.log(this.tradesArr);

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
    if (idc === '1') {
      this.selIndicator = 1;
    } else if (idc === '2') {
      this.selIndicator = 2;
    } else if (idc === '3') {
      this.selIndicator = 3;
    } else if (idc === '4') {
      this.selIndicator = 4;
    }
  }

  resetIndicator() {
    this.selIndicator = 0;
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.dataS;
    this.salesChart.update();
  }

}
