import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill;
  @Input() currency;

  dollar: number;
  euro: number;
  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.currency[0].buy;
    this.euro = this.bill.value / this.currency[1].buy;

  }

}
