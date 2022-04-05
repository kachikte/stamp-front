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
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  marketCodeGlobal = localStorage.getItem('marketCode');

  name = localStorage.getItem('name');
  role = localStorage.getItem('role');

  tradingMembers = [];

  constructor(private router: Router, private dataSer: DataService) {
  }

  ngOnInit() {
      this.tradingMembers = this.dataSer.getClientTradingMemberSelection(this.name);
  }

  submitTradingMemberCode(tm: string) {
    
    localStorage.setItem('tempMem', tm);
      this.router.navigate(['/dashboard']);
  }

  back() {
      this.router.navigate(['market-dashboard']);
  }

}
