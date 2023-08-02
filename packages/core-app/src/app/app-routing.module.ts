import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteComponent } from './remote-component';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'list',
    component: RemoteComponent,
    data: {
      page: 'list',
    },
    canActivate: [noAuthGuard],
  },
  {
    path: 'create',
    component: RemoteComponent,
    data: {
      page: 'create',
    },
    canActivate: [noAuthGuard],
  },
  {
    path: 'edit/:noteId',
    component: RemoteComponent,
    data: {
      page: 'edit',
    },
    canActivate: [noAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
