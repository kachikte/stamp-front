import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

  token: string|undefined;

  constructor(private router: Router, private loginSer: LoginService) {
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

    this.loginSer.checkLogin(form.controls.username.value, form.controls.password.value) ? this.router.navigate(['/market-dashboard']) : this.router.navigate(['login']);
  }

}
