import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
// import {writeJsonFile} from 'write-json-file';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  marketSel = 'Select...';

  marketArr = ['Select ...', 'FMDQ', 'NASD', 'NCX', 'NGX', 'AFEX'];

  memberArr = ['Select ...'];

  secretQuestion = ['Select ...', 'Where did you grow up', 'What was your primary school'];

  constructor() { }

  ngOnInit(): void {
    // this.writeFile().then(r => null);
  }

  // async writeFile() {
  //   await writeJsonFile('foo.json', {foo: true});
  // }

  setTradingMemberList(marketCode: string) {

    if (marketCode === 'NGX') {
      this.memberArr = ['Select ...', 'SISB', 'DISB', 'CICD', 'ABCD'];
    } else {
      this.memberArr = ['Select ...'];
    }
  }

  submit(form: NgForm) {
    console.log(form.controls);
    console.log(form.controls.market.value);
    console.log(form.controls.tradingMembers.value);
  }

}
