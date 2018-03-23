import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/subscription';

import { cat } from '../../../shared/services/model/cat.model';
import { Message } from '../../../shared/services/model/message.model';
import { CatService } from '../../shared/services/cat.service';

@Component({
  selector: 'edit-cate',
  templateUrl: './edit-cate.component.html',
  styleUrls: ['./edit-cate.component.sass']
})
export class EditCateComponent implements OnInit, OnDestroy {
   @Input() categories
   @Output() updatedCat = new EventEmitter()

   sub1: Subscription

  currentCatId = 1;
  currentCat: cat;
  message: Message

  constructor(private cs: CatService) { }

  ngOnInit() {
  this.message = new Message('success', '')
  this.onCatChange()
  console.log(this.categories)
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }

  onCatChange(){
    // this.currentCat = this.categories.find((cat) => cat.id === +this.currentCatId)
    this.currentCat = this.categories.find(c => c.id === +this.currentCatId)
  }

  onSubmit(form: NgForm){
  let { editCat, editCatNumber } = form.value;
  if(editCatNumber < 0) editCatNumber *= -1
  const cat1 = new cat(editCat, editCatNumber, +this.currentCatId)
    this.sub1 = this.cs.updateCat(cat1)
  .subscribe((cat1) => {
    this.updatedCat.emit(cat1)
    this.message.text = 'категория была редактирована успешно';
    window.setTimeout(() => this.message.text = '', 5000)
  })
  }

}
