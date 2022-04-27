import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data/data.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  market = '';

  constructor(private dataSer: DataService) {

    this.market = this.dataSer.marketType;
  }

  ngOnInit() {
    console.log('does this work???????/');
  }

}
