import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency

  dollar: number;
  euro: number;
  date = new Date()

  constructor() { }

  ngOnInit() {
    this.dollar = this.currency[0].buy;
    this.euro = this.currency[1].buy;
  }

}
