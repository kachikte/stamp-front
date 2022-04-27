import {Component, HostListener, OnInit} from '@angular/core';
import Chart from 'chart.js';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
// @ts-ignore
import {Market} from '../../model/Market';
import {TradingClient} from '../../model/TradingClient';
import {Trade} from '../../model/Trade';
import {Party} from '../../model/Party';
import {Router} from '@angular/router';
import {DataService} from '../../services/data/data.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

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

  tradingMemberA = this.role === 'tradingMember' ? this.getTradingMemberDetail() : '';


  public payPalConfig?: IPayPalConfig;
  private showSuccess: boolean;

  publicKey = 'FLWPUBK_TEST-6e9c0316d4efcb310bb843f77dedbf60-X';

  customerDetails = { name: 'Demo Customer  Name', email: 'customer1@gmail.com', phone_number: '08100000000'};

  // tslint:disable-next-line:max-line-length
  customizations = {title: 'Stamp Duty Fess for ' + this.role === 'tradingMember' ? this.tradingMemberA?.tradingMemberCode : '', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'};

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'};

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),

    amount: this.role === 'tradingMember' ? this.tradingMemberA.totalStampDutyFees : 0,
    currency: 'NGN',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: this.meta,
    customer: this.customerDetails,
    customizations: this.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  };

  constructor(private flutterwave: Flutterwave, private router: Router, private dataSer: DataService) {
  }


  ngOnInit() {
    // this.addStakeholder();
    // this.getDataRespectively();
    this.initConfig();

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

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }






  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


  makePayment() {
    this.flutterwave.inlinePay(this.paymentData);
  }
  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log('Payment callback', response);
  }
  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  generateReference(): string {
    const date = new Date();
    return date.getTime().toString();
  }
  public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
