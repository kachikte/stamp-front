import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin = localStorage.getItem('invalidLogin');
  constructor(private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  submit(form: NgForm) {
    console.log('This is the form');
    console.log(form.controls.username.value);
    localStorage.setItem('username', form.controls.username.value);
    localStorage.setItem('password', form.controls.password.value);

    this.router.navigate(['dashboard']);
  }

}
