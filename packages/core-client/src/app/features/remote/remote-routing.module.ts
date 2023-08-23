import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteComponent } from './components';
import { noAuthGuard } from '../../core/guards/no-auth-guard';
import {
  NOTES_CREATE_PATH_PREFIX,
  NOTES_EDIT_PATH_PREFIX,
  NOTES_LIST_PATH_PREFIX,
  PAGE_TYPE,
} from '@self-notes/utils';

const routes: Routes = [
  {
    path: NOTES_LIST_PATH_PREFIX,
    component: RemoteComponent,
    data: {
      page: PAGE_TYPE.list,
    },
    canActivate: [noAuthGuard],
  },
  {
    path: NOTES_CREATE_PATH_PREFIX,
    component: RemoteComponent,
    data: {
      page: PAGE_TYPE.create,
    },
    canActivate: [noAuthGuard],
  },
  {
    path: `${NOTES_EDIT_PATH_PREFIX}/:noteId`,
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
