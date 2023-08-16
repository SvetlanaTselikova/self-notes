import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteComponent } from './components';
import { RemoteRoutingModule } from './remote-routing.module';

@NgModule({
  imports: [CommonModule, RemoteRoutingModule],
  providers: [],
  declarations: [RemoteComponent],
})
export class RemoteModule {}
