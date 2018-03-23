import { Component, OnInit } from '@angular/core';

import { User } from '../../../../shared/services/model/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'heared',
  templateUrl: './heared.component.html',
  styleUrls: ['./heared.component.sass']
})
export class HearedComponent implements OnInit {
  date = new Date()
  user: User
  constructor(private as: AuthService, private router: Router) { }

  ngOnInit() {
  this.user =  JSON.parse(window.localStorage.getItem('user'))
  }

  onLogout(){
    this.as.logout();
    this.router.navigate(['/login']);
  }

}
