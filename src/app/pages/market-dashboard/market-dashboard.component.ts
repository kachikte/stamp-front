import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
// @ts-ignore
import {Market} from '../../model/Market';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';
import {Party} from '../../model/Party';
import {Router} from '@angular/router';
import {DataService} from '../../services/data/data.service';

import { HostListener } from '@angular/core';

@Component({
  selector: 'app-market-dashboard',
  templateUrl: './market-dashboard.component.html',
  styleUrls: ['./market-dashboard.component.css']
})
export class MarketDashboardComponent implements OnInit {

  name = localStorage.getItem('name');
  role = localStorage.getItem('role');

  monthYearCombos = JSON.parse(localStorage.getItem('monthYearCombos'));
  markets = JSON.parse(localStorage.getItem('markets'));


  constructor(private router: Router, private dataSer: DataService) {
  }

  ngOnInit() {

    if (this.name === null) {
      this.reDir();
    }

    // if (this.role === 'superAdmin') {
    //   this.markets = this.dataSer.getAdminMarket();
    // } else if (this.role === 'TRADING_MEMBER') {
    //   this.markets = this.dataSer.getTradingMarketSelection(this.name);
    // } else if (this.role === 'tradingClient') {
    //   this.markets = this.dataSer.getClientMarketSelection(this.name);
    // }

  }

  submitMarketCode(mark: string) {
    localStorage.removeItem('marketCode');
    localStorage.setItem('marketCode', mark);
    this.dataSer.toggleMarketChange(localStorage.getItem('marketCode'));
    if (this.role === 'superAdmin' || this.role === 'TRADING_MEMBER') {
      this.router.navigate(['/dashboard']);
    } else if (this.role === 'tradingClient') {
      this.router.navigate(['/member-dashboard']);
    }
  }

  reDir() {
    this.router.navigate(['/login']);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

}
