import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BillService } from '../shared/services/bill.service';
import { CatService } from '../shared/services/cat.service';
import { EventsService } from '../shared/services/events.service';
import { cat } from '../../shared/services/model/cat.model';
import { Emodel } from '../../shared/services/model/e.model';

@Component({
  selector: 'planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.sass']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  bill ;
  cater: cat[] = [];
  even: Emodel[] = [];

  constructor(private bs: BillService, private cs: CatService, private es: EventsService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.bs.getBill(),
      this.cs.getCat(),
      this.es.getEvents()
    ).subscribe((data) => {
      this.bill = data[0],
      this.cater = data[1],
      this.even = data[2],
      this.isLoaded = true;
      console.log(this.bill)
    })
  }
  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
  }

  getPercent(c){
    let per = (100 * this.getCatCost(c)) / c.capacity
    return per > 100 ? 100 : per
  }

  getCatPercent(c){
    return this.getPercent(c) + '%'
  }

  getCatColor(c){
    let per = this.getPercent(c)
    return per < 60 ? 'success' : per >= 100 ? 'danger' : 'warning'
  }

  getCatCost(c){
    let catEvent = this.even.filter(e => e.category === c.id && e.type === 'outcome')
    return catEvent.reduce((total, e) => {
      total += e.amount
      return total
    }, 0)
  }

}
