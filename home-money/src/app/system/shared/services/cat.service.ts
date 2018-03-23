import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { cat } from '../../../shared/services/model/cat.model';

@Injectable()
export class CatService {

  constructor(private http: Http) { }

  addCat(cat: cat){
    return this.http.post('http://localhost:3000/categories' , cat)
    .map((res) => res.json())
  }

  getCat(){
    return this.http.get('http://localhost:3000/categories')
    .map((res) => res.json())
  }
  updateCat(cat){
    return this.http.put(`http://localhost:3000/categories/${cat.id}`, cat)
    .map((res) => res.json() )
  }

}
