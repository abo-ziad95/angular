import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

@Injectable()
export class BillService {

  constructor(private http: Http) { }

  getBill(){
      return this.http.get(`http://localhost:3000/bill`)
      .map((res) => res.json())
  }
  updateBill(bill){
    return this.http.put(`http://localhost:3000/bill`, bill)
  }
  getCurrency(){
    return this.http.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
    .map((res) => res.json())
  }

}
