import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteComponent } from './remote-component';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'list',
    component: RemoteComponent,
    data: {
      page: 'list',
    },
  },
  {
    path: 'create',
    component: RemoteComponent,
    data: {
      page: 'create',
    },
  },
  {
    path: 'edit/:noteId',
    component: RemoteComponent,
    data: {
      page: 'edit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
