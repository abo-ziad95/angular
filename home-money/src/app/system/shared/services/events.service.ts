import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class EventsService {

  constructor(private http: Http) { }

  addEvent(e){
    return this.http.post('http://localhost:3000/events' , e)
     .map((res) => res.json())
  }

  getEvents(){
    return this.http.get('http://localhost:3000/events')
    .map((res) => res.json() )
  }

}
