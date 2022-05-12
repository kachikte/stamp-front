import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css']
})
export class SuccesspageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

}
