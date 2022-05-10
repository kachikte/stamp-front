import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SelectPartComponent} from '../selectPart/select-part/select-part.component';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

  token: string|undefined;

  constructor(private router: Router, private loginSer: LoginService, private dataSer: DataService, private notification: NotificationsService, public matDialog: MatDialog) {
    this.token = undefined;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  submit(form: NgForm) {
    // tslint:disable-next-line:max-line-length
    // if (form.invalid) {
    //   for (const control of Object.keys(form.controls)) {
    //     form.controls[control].markAsTouched();
    //   }
    //   return;
    // }

    // console.debug(`Token [${this.token}] generated`);

    // tslint:disable-next-line:max-line-length
    // this.loginSer.checkLogin(form.controls.username.value, form.controls.password.value) ? this.router.navigate(['/market-dashboard']) : this.router.navigate(['login']);

    this.dataSer.getStakeHolderProfile(form.controls.username.value, form.controls.password.value);

    this.dataSer.loginData.subscribe(value => {
      console.log('Login component value: ', value['id']);

      if (value['id'] != null ) {
        localStorage.setItem('name', value['id']);
        localStorage.setItem('role', value['stakeComputationLevel']);
        localStorage.setItem('markets', JSON.stringify(value['marketPlaces']));
        localStorage.setItem('monthYearCombos', JSON.stringify(value['monthYearCombos']));
        this.router.navigate(['/market-dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  showDia() {
    this.notification.showSuccess();

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'select-part-component';
    // dialogConfig.height = '350px';
    // dialogConfig.width = '600px';
    dialogConfig.height = '250px';
    dialogConfig.width = '400px';
    const modalDialog = this.matDialog.open(SelectPartComponent, dialogConfig);
  }

}
