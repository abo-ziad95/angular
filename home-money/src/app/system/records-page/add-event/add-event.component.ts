import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/subscription'

import { Emodel } from '../../../shared/services/model/e.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Message } from '../../../shared/services/model/message.model';


@Component({
  selector: 'add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories

  message
  sub1: Subscription
  sub2: Subscription


  types = [
    {type: 'income', txt: 'доход'},
    {type: 'outcome', txt: 'расход'}
  ]

  constructor(private es: EventsService,
              private bs: BillService) { }

  ngOnInit() {
    this.message = new Message('danger' , '')
    // console.log(this.categories)
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
    if(this.sub2) this.sub2.unsubscribe()

  }

  showMessage(text){
    this.message.text = text
    window.setTimeout(()=> this.message.text = '', 5000)
  }

  onSubmit(form){
    let { category, amount, desc, type } = form.value;
    if(amount < 0) amount *= -1;
    const e = new Emodel(type, amount, +category,
      moment().format('DD.MM.YYYY HH:mm:ss'), desc);
      this.sub1 = this.bs.getBill()
      .subscribe((bill) => {
        let value = 0;
       if(type === 'outcome'){
         if(bill.value < amount){
           this.showMessage(`вам недостаточно среств на счете. вам не хватает ${amount - bill.value}`)
           return
         }else {
         value = bill.value - amount
       }
     }else{
       value = bill.value + amount
     }
     this.sub2 = this.bs.updateBill({value: value, currency: bill.currency})
     .mergeMap(() => this.es.addEvent(e))
     .subscribe(() => {
       form.setValue({
         amount: 1,
         desc: 'вводите опесание',
         category: 1,
         type: 'income'
       })
     })
    })

  }

}
