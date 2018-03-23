import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/model/user.model';
import { Message } from '../../shared/services/model/message.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;
  constructor(
    private us: UsersService,
    private as: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
    .subscribe((params: Params) => {
      if(params['nowCanLogin']){
        this.showMessage('вы уже можете зайти в систему', 'success')
      }else if(params['accessDenied']){
          this.showMessage('для работы с ситемой вам необходимо войти', 'warning')
      }
    }
  )
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

private showMessage(text: string, type: string = 'danger'){
  this.message = new Message(type,text);
  window.setTimeout(() => {
    this.message.text = '';
  }, 8000)
}

  onSubmit(){
    let formData = this.form.value;
    this.us.getUserByEmail(formData.email)
    .subscribe((user) => {
      if(user){
        if(user.password === formData.password){
          this.message.text = '';
          window.localStorage.setItem('user', JSON.stringify(user));
          this.as.login();
          this.router.navigate(['/system', 'bill'])
        }else{
          this.showMessage('неверный пароль')
        }
      }else{
        this.showMessage('такого пользователя нет')
      }
    })

  }

}
