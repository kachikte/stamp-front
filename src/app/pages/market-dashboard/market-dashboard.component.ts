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
  selector: 'app-market-dashboard',
  templateUrl: './market-dashboard.component.html',
  styleUrls: ['./market-dashboard.component.css']
})
export class MarketDashboardComponent implements OnInit {

  name = localStorage.getItem('name');
  role = localStorage.getItem('role');

  markets = [];

  months = ['Select Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private router: Router, private dataSer: DataService) {
  }

  ngOnInit() {

    if (this.role === 'superAdmin') {
      this.markets = this.dataSer.getAdminMarket();
    } else if (this.role === 'tradingMember') {
      this.markets = this.dataSer.getTradingMarketSelection(this.name);
    } else if (this.role === 'tradingClient') {
      this.markets = this.dataSer.getClientMarketSelection(this.name);
    }

  }

  submitMarketCode(mark: string) {
    localStorage.removeItem('marketCode');
    localStorage.setItem('marketCode', mark);
    if (this.role === 'superAdmin' || this.role === 'tradingMember') {
      this.router.navigate(['/dashboard']);
    } else if (this.role === 'tradingClient') {
      this.router.navigate(['/member-dashboard']);
    }
  }

}
