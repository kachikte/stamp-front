import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';
import {DataService} from '../../services/data/data.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESADMIN: RouteInfo[] = [
    { path: '#!', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon: 'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon: 'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon: 'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon: 'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon: 'ni-circle-08 text-pink', class: '' }
];

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role = localStorage.getItem('role');

  public menuItems: any[];
  public isCollapsed = true;

  tradingMember = this.role === 'tradingMember' ? this.getTradingMemberDetail() : '';

  public payPalConfig?: IPayPalConfig;
  private showSuccess: boolean;




  publicKey = 'FLWPUBK_TEST-6e9c0316d4efcb310bb843f77dedbf60-X';

  customerDetails = { name: 'Demo Customer  Name', email: 'customer1@gmail.com', phone_number: '08100000000'};

  customizations = {title: 'Stamp Duty Fess for ' + this.role === 'tradingMember' ? this.tradingMember?.tradingMemberCode : '', description: 'Customization Description', logo: 'https://flutterwave.com/images/logo-colored.svg'};

  meta = {'counsumer_id': '7898', 'consumer_mac': 'kjs9s8ss7dd'};

  paymentData: InlinePaymentOptions = {
    public_key: this.publicKey,
    tx_ref: this.generateReference(),
    amount: this.role === 'tradingMember' ? this.tradingMember.totalStampDutyFees : 0,
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

  constructor(private router: Router, private flutterwave: Flutterwave, private dataSer: DataService) { }

  ngOnInit() {
    this.initConfig();
    this.menuItems = localStorage.getItem('role') === 'superAdmin' ? ROUTESADMIN.filter(menuItem => menuItem) : ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

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

  getTradingMemberDetail() {
    const tradingMemberCode = localStorage.getItem('name');
    return this.dataSer.getSpecificTradingMember(tradingMemberCode);
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
