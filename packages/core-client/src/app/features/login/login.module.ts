import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { GoogleLoginComponent } from './components';
import {
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    GoogleSigninButtonModule,
  ],
  providers: [

  ],
  declarations: [LoginComponent, GoogleLoginComponent],
})
export class LoginModule {}
