import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IColumnPipeArgs, IgxColumnComponent} from 'igniteui-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import * as data from '../../../assets/data/data.json';
import {TradingMember} from '../../model/TradingMember';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.css']
})
export class GridDataComponent implements OnInit, OnChanges {

  public col: IgxColumnComponent | undefined;
  public pWidth: string | undefined;
  public nWidth: string | undefined;

  // @ts-ignore
  pipeArgs: IColumnPipeArgs = {
    format: 'longDate',
    timezone: 'UTC',
    digitsInfo: '1.2-2'
  };

  marketData = data;
  @Input() code: any;
  @Input() indicator = 0;
  // title = "Stamp Duty Data";

  tradingMembers: any;
  tradingClients: any;

  tradM: any[] | null = [];
  tradC: any[] | null = [];
  tradT: any[] | null = [];

  items: any;

  @Input() myTestData: string | undefined;

  constructor(private _http: HttpClient) {
    if (this.indicator === 0) {
      // @ts-ignore
      this.tradingMembers = this.marketData.marketData.market.tradingMembers;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const trm: TradingMember[] = [];
    const trllc: TradingClient[] = [];
    const trc: TradingClient[] = [];

    const trllt: Trade[] = [];
    const trt: Trade[] = [];

    // @ts-ignore
    for (const tradCll of this.marketData.marketData.market.tradingMembers) {
      for (const tcn of tradCll.tradingClients) {
        trllc.push(tcn);
      }
    }

    for (const tradTll of trllc) {
      // @ts-ignore
      for (const tradd of tradTll.trades) {
        trllt.push(tradd);
      }
    }

    if (this.indicator === 1) {
      // @ts-ignore
      for (const tradMem of this.marketData.marketData.market.tradingMembers) {
        if (tradMem.tradingMemberCode === this.code) {
          trm.push(tradMem);
        }
      }

      this.tradM = trm;
      console.log('========This is what I need');
      console.log(this.tradM);
    }

    if (this.indicator === 2) {
      for (const tradClie of trllc) {
        if (tradClie.accountNumber === this.code) {
          trc.push(tradClie);
        }
      }

      this.tradC = trc;
    }

    if (this.indicator === 3) {
      for (const trat of trllt) {
        if (trat.securityCode === this.code) {
          trt.push(trat);
        }
      }

      this.tradT = trt;
    }


    // console.log("========This is what I need again");
    // console.log(tradd);

  }

  ngOnInit(): void {
  }

  public onResize(event: { column: IgxColumnComponent; prevWidth: string; newWidth: string; }) {
    this.col = event.column;
    this.pWidth = event.prevWidth;
    this.nWidth = event.newWidth;
  }

  public formatter = (a: any) => a;

}

