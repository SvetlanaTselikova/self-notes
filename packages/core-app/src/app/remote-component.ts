import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import * as React from 'react';
import { ActivatedRoute } from '@angular/router';
import { createRoot } from 'react-dom/client';

const containerElementName = 'reactApp';

@Component({
  selector: 'app-react',
  template: ` <h2 style="color: cadetblue">
    <span #${containerElementName}></span>
  </h2>`,
})
export class WrapperComponent implements AfterContentInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  vc!: ElementRef;
  root!: any;

  constructor(private route: ActivatedRoute) {}

  async ngAfterContentInit() {
    this.root = createRoot(this.containerRef.nativeElement);

    try {
      import('notes/Module').then((val) => {
        console.log(val);
        this.root.render(React.createElement(val.default));
      });
    } catch (error) {
      console.log('Erorr', error);
    }
  }
}