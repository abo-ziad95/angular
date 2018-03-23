import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

bill;
currency;
isLoad = false;

  constructor(private bs: BillService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.bs.getBill(),
      this.bs.getCurrency()
    ).subscribe((data) => {
      this.bill = data[0];
      this.currency = data[1]
      this.isLoad = true;
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe()
    if(this.sub2){
     this.sub2.unsubscribe()
    }
  }

  onRefresh(){
    this.isLoad = false;
    this.sub2 = this.bs.getCurrency()
    .subscribe((cur) => {this.currency = cur; this.isLoad = true;})
  }

}
