import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
// import {writeJsonFile} from 'write-json-file';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupId = 0;

  marketSel = 'Select...';

  marketArr = ['Select ...', 'FMDQ', 'NASD', 'NCX', 'NGX', 'AFEX'];

  companyArr = ['Select ...', 'COMPANY-ONE', 'COMPANY-TWO', 'COMPANY-THREE', 'COMPANY-FOUR', 'COMPANY-FIVE'];

  // tslint:disable-next-line:triple-equals
  memberArr = ['Select ...'];

  secretQuestion = ['Select ...', 'Where did you grow up', 'What was your primary school'];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.writeFile().then(r => null);

    console.log(this.signupId);

    this.getSignupId();

    // tslint:disable-next-line:triple-equals
    this.memberArr = this.signupId == 2 ? ['Select ...', 'SISB', 'DISB', 'CICD', 'ABCD'] : ['Select ...'];

      console.log(this.signupId);
  }

  getSignupId() {
    this.signupId = this.activatedRoute.snapshot.params['id'];
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

  setCompanyList(tmCode: string) {

    // if (marketCode === 'NGX') {
    //   this.memberArr = ['Select ...', 'SISB', 'DISB', 'CICD', 'ABCD'];
    // } else {
    //   this.memberArr = ['Select ...'];
    // }
  }

  submit(form: NgForm) {
    console.log(form.controls);
    console.log(form.controls.market.value);
    console.log(form.controls.tradingMembers.value);
  }

}
