import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/subscription';

import { CatService } from '../../shared/services/cat.service';
import { cat } from '../../../shared/services/model/cat.model';
@Component({
  selector: 'add-cate',
  templateUrl: './add-cate.component.html',
  styleUrls: ['./add-cate.component.sass']
})
export class AddCateComponent implements OnInit, OnDestroy {
 @Output() newCate = new EventEmitter()
 sub1: Subscription

  constructor(private cs: CatService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }

  onSubmit(form: NgForm){
    let { catName, catVal } = form.value;
    if(catVal < 0) catVal *= -1;

    const cat1 = new cat(catName, catVal)

    this.sub1 = this.cs.addCat(cat1)

    .subscribe((cat) => {
      form.reset()
      form.form.patchValue({catVal: 1})
      this.newCate.emit(cat)
      // console.log(cat)

    })
  }

}
