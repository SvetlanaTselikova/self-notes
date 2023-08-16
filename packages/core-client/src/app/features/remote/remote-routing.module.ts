import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteComponent } from './components';
import { noAuthGuard } from '../../core/guards/no-auth-guard';
import {
  NOTES_CREATE_PATH,
  NOTES_EDIT_PATH,
  NOTES_LIST_PATH,
  PAGE_TYPE,
} from '@self-notes/utils';

const routes: Routes = [
  {
    path: NOTES_LIST_PATH.slice(1),
    component: RemoteComponent,
    data: {
      page: PAGE_TYPE.list,
    },
    canActivate: [noAuthGuard],
  },
  {
    path: NOTES_CREATE_PATH.slice(1),
    component: RemoteComponent,
    data: {
      page: PAGE_TYPE.create,
    },
    canActivate: [noAuthGuard],
  },
  {
    path: `${NOTES_EDIT_PATH.slice(1)}/:noteId`,
    component: RemoteComponent,
    data: {
      page: PAGE_TYPE.edit,
    },
    canActivate: [noAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoteRoutingModule {}
