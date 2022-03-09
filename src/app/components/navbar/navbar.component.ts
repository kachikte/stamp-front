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
    if (this.username === 'admin@stampduty') {
      this.name = 'FIRS ADMIN';
    } else if (this.username === 'tm@stampduty') {
      this.name = 'TRADING MEMBER';
    } else if (this.username === 'tc@stampduty') {
      this.name = 'TRADING CLIENT';
    } else if (this.username === 't@stampduty') {
      this.name = 'TRADE';
    }
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.name + ' ' + this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
