import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Please Choose as Appropriate', 'Stamp Duty Signup');
  }
}
