import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from '../../core/guards/auth-guard';
import { LOGIN_PATH } from '@self-notes/utils';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: LOGIN_PATH.slice(1),
    component: LoginComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
