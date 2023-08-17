import {
  Component,
  ElementRef,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import * as React from 'react';
import { ActivatedRoute } from '@angular/router';
import { createRoot } from 'react-dom/client';
import { MessageBus } from '@self-notes/clients-message-bus';

const CONTAINER_ELEMENT_NAME = 'injectedApp';

@Component({
  selector: 'app-remote-component',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.sass'],
})
export class RemoteComponent implements AfterContentInit {
  @ViewChild(CONTAINER_ELEMENT_NAME, { static: true })
  containerRef!: ElementRef;
  vc!: ElementRef;
  root!: any;

  constructor(
    private route: ActivatedRoute,
    private messageBusService: MessageBus
  ) {}

  async ngAfterContentInit() {
    this.root = createRoot(this.containerRef.nativeElement);
    const pageName = this.route.snapshot.data['page'];

    try {
      import('notes-client/Module').then((val) => {
        this.root.render(
          React.createElement(val.default, {
            page: pageName,
            messageBus: this.messageBusService,
          })
        );
      });
    } catch (error) {
      console.log('Erorr', error);
    }
  }
}
