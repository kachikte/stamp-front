import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import * as data from '../../../assets/data/dataSourceClient.csv';

@Injectable({
  providedIn: 'root'
})
export class ReadCsvService {

  data = '../../../assets/data/dataSourceClient.csv';

  constructor(private http: HttpClient) { }

  getInfo() {
    return this.http.get(this.data, {responseType: 'text'});
  }
}
