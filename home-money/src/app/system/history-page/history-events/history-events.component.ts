import { Component, OnInit, Input } from '@angular/core';
import { Emodel } from '../../../shared/services/model/e.model'

@Component({
  selector: 'history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {
  @Input() cats;
  @Input() events: Emodel[] = [];

  placeHolder = 'сумма';
  searchVal = '';
  searchFild = 'amount'

  constructor() { }

  ngOnInit() {
    console.log(this.cats)
    this.events.forEach((e) => {
      e.catName = this.cats.find(c => c.id === e.category).name;
  })
  console.log(this.events)
}

getLable(e){
  return {
    'label': true,
    'label-danger': e.type === 'outcome',
    'label-success': e.type === 'income'
  }
}

changeCriteria(f){
  const nameMap = {
    amount: 'суммв',
    date: 'дата',
    category: 'категория',
    type: 'тип'
  }
  this.placeHolder = nameMap[f];
  this.searchFild = f;
}

}
