import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../services/data/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

// import {writeJsonFile} from 'write-json-file';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupId = 0;

  marketSel = 'Select...';

  ngSelect = 'Select ...';

  ngSelectAns = 'Select ...';

  marketArr = ['Select ...', 'FMDQ', 'NASD', 'NCX', 'NGX', 'AFEX'];

  memberArr = [{'key': 'option', 'value': 'Select ...'}];

  companyArr = ['Select ...', 'COMPANY-ONE', 'COMPANY-TWO', 'COMPANY-THREE', 'COMPANY-FOUR', 'COMPANY-FIVE'];

  secretQuestion = ['Select ...', 'Where did you grow up', 'What was your primary school'];

  constructor(private dataSer: DataService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.getSignupId();
    // console.log('MEMBERARR', this.memberArr);

    // console.log('INIT TRADING MEMEBER', this.dataSer.getTradingMembersController('NGX'));
    // this.writeFile().then(r => null);
  }

  // async writeFile() {
  //   await writeJsonFile('foo.json', {foo: true});
  // }

  setTradingMemberList(marketCode: string) {

    // console.log(this.dataSer.getTradingMembersController(marketCode));

    this.memberArr = this.dataSer.getTradingMembersController(marketCode);


    // tslint:disable-next-line:triple-equals max-line-length
    // this.memberArr = this.dataSer.getTradingMembersController(marketCode).length == 0 ? [{'key': 'option', 'value': 'Select ...'}] : this.dataSer.getTradingMembersController(marketCode);

    // if (marketCode === 'NGX') {
    //   this.memberArr = ['Select ...', 'SISB', 'DISB', 'CICD', 'ABCD'];
    // } else {
    //   this.memberArr = ['Select ...'];
    // }
  }

  getSignupId() {
    this.signupId = this.activatedRoute.snapshot.params['id'];
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
    // console.log(form.controls.market.value);
    // console.log(form.controls.tradingMembers.value);
    // console.log(form.controls.password.value);
    // // console.log(form.controls.confirmPassword.value);
    // console.log(form.controls.secretQuestions.value);
    // console.log(form.controls.answer.value);
    // tslint:disable-next-line:max-line-length
    this.dataSer.stakeHolderRegistration(form.controls.market.value, form.controls.tradingMembers.value, form.controls.password.value, form.controls.confirmPassword.value, form.controls.secretQuestions.value, form.controls.answer.value);

    this.dataSer.signUpData.subscribe(value => {
      // tslint:disable-next-line:no-unused-expression
      value['keyValueCollection'][0]['value'] !== 'N_A' ? this.router.navigate(['login']) : this.toastr.warning('Please fill all fields', 'Invalid Input');
      console.log('Value I am checking ', value['keyValueCollection'][0]['value']);
    });
  }

}
