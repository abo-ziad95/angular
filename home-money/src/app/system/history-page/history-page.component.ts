import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { CatService } from '../shared/services/cat.service';
import { EventsService } from '../shared/services/events.service';
import { cat } from '../../shared/services/model/cat.model';
import { Emodel } from '../../shared/services/model/e.model';

@Component({
  selector: 'history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription

  chartData = [];

  isLoaded = false;

  cateHis = [];

  even = [];

  constructor(private cs: CatService, private es: EventsService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.cs.getCat(),
      this.es.getEvents()
    ).subscribe((data: [cat[], Emodel[]]) => {
      this.cateHis = data[0],
      this.even = data [1],
      this.culcCahrtdata(),
      this.isLoaded = true
      // console.log(this.cate),
      // console.log(this.even)
    })
  }

    ngOnDestroy(){
      if(this.sub1)this.sub1.unsubscribe()
    }

    culcCahrtdata(){
      this.chartData = [];
      this.cateHis.forEach((c) => {
        const catEvent = this.even.filter((e) => e.category === c.id && e.type === 'outcome');
        this.chartData.push({
          name: c.name,
          value: catEvent.reduce((total,e) => {
            total += e.amount
            return total
          },0)
        })
      })

    }

}
