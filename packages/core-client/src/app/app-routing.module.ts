import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_PATH_PREFIX, NOTES_PATH_PREXIX } from '@self-notes/utils';
import { PageNotFoundComponent } from './layout';

const routes: Routes = [
  {
    path: LOGIN_PATH_PREFIX,
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: NOTES_PATH_PREXIX,
    loadChildren: () =>
      import('./features/remote/remote.module').then((m) => m.RemoteModule),
  },
  {
    path: '',
    redirectTo: LOGIN_PATH_PREFIX,
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
