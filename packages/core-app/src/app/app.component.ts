import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'self-notes-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  registerIcons() {
    this.matIconRegistry
      .addSvgIcon(
        `google`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/google-icon.svg'
        )
      )
      .addSvgIcon(
        `vk`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/vk-icon.svg'
        )
      );
  }
  title = 'core-app';
}
