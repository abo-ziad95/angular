import { Component, OnInit } from '@angular/core';

import { CatService } from '../shared/services/cat.service';
import { cat } from '../../shared/services/model/cat.model';

@Component({
  selector: 'records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.sass']
})
export class RecordsPageComponent implements OnInit {
  categories= []
  isLoading = false;

  constructor(private cs:CatService) { }

  ngOnInit() {
    this.cs.getCat()
    .subscribe((cat) => {this.categories = cat; this.isLoading = true;})
  }
newCatAdded(cate){
  // console.log(cate)
  this.categories.push(cate);
}
catWasUpdated(cat: cat){
  let inx = this.categories.find(c => c.id === cat.id)
  this.categories[inx] = cat;
}
}
