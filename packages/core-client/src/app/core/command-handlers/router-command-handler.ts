import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseCommandHandler,
  NavigateCommand,
} from 'libs/clients-message-bus/src/lib/types';

@Injectable()
export class RouterCommandHandler
  implements BaseCommandHandler<NavigateCommand>
{
  constructor(private router: Router) {}

  commandName: NavigateCommand['name'] = 'navigate';

  execute(route: NavigateCommand['data']) {
    this.router.navigate([route]);
  }
}
