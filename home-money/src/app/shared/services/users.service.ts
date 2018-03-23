import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from './model/user.model';
@Injectable()

export class UsersService {

constructor (private http: Http){}

getUserByEmail(email){
  return this.http.get(`http://localhost:3000/users/?email=${email}`)
  .map((res) => res.json())
  .map((user: User) => user[0] ? user[0] : null)
}
creatwNewUser(user: User){
    return this.http.post('http://localhost:3000/users', user)
      .map((res) => res.json())
}

}
