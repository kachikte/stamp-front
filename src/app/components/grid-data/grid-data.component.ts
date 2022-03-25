import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IColumnPipeArgs, IgxColumnComponent} from 'igniteui-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import {TradingMember} from '../../model/TradingMember';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';
import {DataService} from '../../services/data/data.service';
import {Party} from '../../model/Party';

@Component({
  selector: 'app-grid-data',
  templateUrl: './grid-data.component.html',
  styleUrls: ['./grid-data.component.css'],
  providers: [DataService]
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

  marketData;
  @Input() code: any;
  @Input() indicator = 0;
  // title = "Stamp Duty Data";

  tradingMembers: any;
  tradingClients: any;

  tradM: any;
  tradC: any[] | null = [];
  tradT: any[] | null = [];
  prT: any[] | null = [];

  items: any;

  @Input() myTestData: string | undefined;

  constructor(private _http: HttpClient, private dataSer: DataService) {
    this.marketData = this.dataSer.getData();
    for (const market of this.marketData) {
      if (this.indicator === 0) {
        // @ts-ignore
        this.tradingMembers = market.tradingMembers;
        console.log('yen yenn yenn');
        console.log(this.tradingMembers);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const trm: any[] = [];
    const trllc: any[] = [];
    const trc: any[] = [];

    const acllt: any[] = [];
    const atr: any[] = [];


    const trllt: Trade[] = [];
    const trt: Trade[] = [];

    const prllt: Party[] = [];
    const prt: Party[] = [];

    const datarrr = this.dataSer.getData();

    // @ts-ignore
    for (const market of datarrr) {
      for (const tradCll of market.tradingMembers) {
        for (const tcn of tradCll.tradingClients) {
          trllc.push(tcn);
        }
      }
    }

    for (const accTll of trllc) {
      // @ts-ignore
      for (const acct of accTll.accountTrades) {
        acllt.push(acct);
      }
    }

    console.log('griiiddd data');
    console.log(acllt);

    for (const tradTll of acllt) {
      // @ts-ignore
      for (const tradd of tradTll.trades) {
        trllt.push(tradd);
      }
    }

    for (const prTll of trllt) {
      // @ts-ignore
      for (const pr of prTll.parties) {
        prllt.push(pr);
      }
    }

    if (this.indicator === 1) {
      // @ts-ignore
      for (const market of datarrr) {
        for (const tradMem of market.tradingMembers) {
          if (tradMem.tradingMemberCode.toLowerCase() === this.code.toLowerCase()) {
            trm.push(tradMem);
          }
        }
      }

      this.tradM = trm;
    }

    if (this.indicator === 2) {
      for (const tradClie of trllc) {
        if (tradClie.fistName.toLowerCase().concat(' ').concat(tradClie.lastName.toLowerCase()) === this.code.toLowerCase()) {

          console.log(tradClie.fistName.toLowerCase().concat(' ').concat(tradClie.lastName.toLowerCase()));
          console.log(this.code.toLowerCase());
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


    if (this.indicator === 4) {
      for (const prat of prllt) {
        if (prat.partyId === this.code) {
          prt.push(prat);
        }
      }

      this.prT = prt;
    }

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

