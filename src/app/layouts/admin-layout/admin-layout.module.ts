import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ComponentsModule} from '../../components/components.module';
import {IgxHierarchicalGridModule} from 'igniteui-angular';
import {NgxPayPalModule} from 'ngx-paypal';
import {MarketDashboardComponent} from '../../pages/market-dashboard/market-dashboard.component';
import {MemberDashboardComponent} from '../../pages/member-dashboard/member-dashboard.component';
import {DatepickerModule} from 'ng2-datepicker';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        ComponentsModule,
        IgxHierarchicalGridModule,
        NgxPayPalModule,
        DatepickerModule
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MarketDashboardComponent,
    MemberDashboardComponent,
  ]
})

export class AdminLayoutModule {}
