import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/Common';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
     LoginComponent,
     AuthComponent,
     RegistrationComponent
   ],
   imports: [
     CommonModule,
     AuthRoutingModule,
     SharedModule
   ]
})

export class AuthModule{

}
