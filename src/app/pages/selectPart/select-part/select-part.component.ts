import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-part',
  templateUrl: './select-part.component.html',
  styleUrls: ['./select-part.component.css']
})
export class SelectPartComponent implements OnInit {

  typeArr = [{'key': '0', 'value': 'Trading Member'}, {'key': '1', 'value': 'Trading Client'}];

  constructor(private router: Router, public dialogRef: MatDialogRef<SelectPartComponent>) { }

  ngOnInit(): void {
  }

  setNavigation(par: string) {
    console.log(par);
    this.signUp(+par);
    this.closeModal();
  }

  signUp(id: number) {
    this.router.navigate(['signup', id]);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
