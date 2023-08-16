import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, merge, of } from 'rxjs';
import { LOGIN_PATH } from '@self-notes/utils';

@Component({
  selector: 'self-notes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.registerIcons();
  }

  isLoginRoute$ = merge(
    of(this.router.url),
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: any) => event.url)
    )
  ).pipe(map((url: string) => url === LOGIN_PATH));

  registerIcons() {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/google-icon.svg'
      )
    );
  }
  title = 'core-client';
}
