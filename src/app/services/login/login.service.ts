import {Injectable} from '@angular/core';
import {DataService} from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userP;

  constructor(private dataSer: DataService) {
    this.userP = this.dataSer.getUsers().users.dets;
  }

  checkLogin(username: string, password: string) {
    console.log(username);
    console.log(password);
    for (const userData of this.userP) {
      if (username === userData.username) {
        if (password === userData.password) {
          if (userData.role === 'tradingClient') {
            localStorage.setItem('nameEx', userData.firstName.toUpperCase().concat(' ').concat(userData.lastName.toUpperCase()));
          }
          localStorage.setItem('name', userData.name);
          localStorage.setItem('role', userData.role);
          console.log(userData.role);
          return true;
        }
      }
    }
  }
}
