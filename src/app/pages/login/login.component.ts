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

  constructor(private router: Router, private loginSer: LoginService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  submit(form: NgForm) {
    // tslint:disable-next-line:max-line-length
    this.loginSer.checkLogin(form.controls.username.value, form.controls.password.value) ? this.router.navigate(['/market-dashboard']) : this.router.navigate(['login']);
  }

}
