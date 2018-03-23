import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/services/model/user.model';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(private us: UsersService, private router:Router) { }

ngOnInit() {
  this.form = new FormGroup({
  'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
  'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  'name': new FormControl(null, [Validators.required]),
  'agree': new FormControl(false, [Validators.requiredTrue])
  })
}

onSubmit(){
  const {email, password, name} = this.form.value;
  const user = new User(email, password, name)
  this.us.creatwNewUser(user)
  .subscribe(() => {
    this.router.navigate(['/login'], {queryParams: {nowCanLogin: true}
  })
  })
}

forbiddenEmails(control: FormControl){
  return new Promise((resolve, reject) => {
    this.us.getUserByEmail(control.value)
    .subscribe((user: User) => {
      if(user){
        resolve({forbiddenEmail: true})
      }else{
        resolve(null)
      }
    })
  })
}
}
