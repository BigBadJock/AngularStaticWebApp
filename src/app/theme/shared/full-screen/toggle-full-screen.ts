/* eslint-disable class-methods-use-this */
import { Directive, ElementRef, HostListener } from '@angular/core';

import * as screenfull from 'screenfull';
import { Screenfull } from 'screenfull';

@Directive({
  selector: '[appToggleFullScreen]',
})
export class ToggleFullScreenDirective {
  constructor(private elements: ElementRef) {}

  @HostListener('click')
  onClick() {
    const sf: Screenfull = screenfull as Screenfull;
    if (this.isScreenFull(sf)) {
      if (sf.isFullscreen) {
        sf.exit();
      } else {
        sf.request();
      }
    }
  }

  isScreenFull(sf: Screenfull | false): sf is Screenfull {
    return (sf as Screenfull).isFullscreen;
  }
}
