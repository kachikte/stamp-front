import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  marketArr = ['Select ...', 'FMDQ', 'NASD', 'NCX', 'NGX', 'AFEX'];

  memberArr = ['Select ...', 'SISB', 'DISB', 'CICD', 'ABCD'];

  secretQuestion = ['Select ...', 'Where did you grow up', 'What was your primary school'];

  constructor() { }

  ngOnInit(): void {
  }

  setCode(cd: string) {
  }

  // setCode(cd: string) {
  //   this.code = cd;
  //   console.log('This is the selection code');
  //   console.log(this.code);
  // }

  submit(){};

}
