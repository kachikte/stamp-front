import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username = localStorage.getItem('username');
  name: string;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }


  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        // if(this.listTitles[item].path === titlee){
      if (localStorage.getItem('role') === 'tradingClient') {
        return localStorage.getItem('nameEx') + ' ' + this.listTitles[item].title;
      }

      if (localStorage.getItem('role') === 'superAdmin') {
        return 'FIRS USER' + ' ' + this.listTitles[item].title;

        // return (localStorage.getItem('marketCode') ? ('Market : ' + localStorage.getItem('marketCode') + '\t \| ') : '') + '\t FIRS USER' + ' ' + this.listTitles[item].title;
      }

            return localStorage.getItem('name') + ' ' + this.listTitles[item].title;
        // }
    }
    return 'Dashboard';
  }

  getMarket(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        // if(this.listTitles[item].path === titlee){
      if (localStorage.getItem('role') === 'tradingClient') {
        return localStorage.getItem('nameEx') + ' ' + this.listTitles[item].title;
      }

      if (localStorage.getItem('role') === 'superAdmin') {
        return localStorage.getItem('marketCode') ? ('Market : ' + localStorage.getItem('marketCode')) : '';
      }

            return localStorage.getItem('name') + ' ' + this.listTitles[item].title;
        // }
    }
    return 'Dashboard';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
