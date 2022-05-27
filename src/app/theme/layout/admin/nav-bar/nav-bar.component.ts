import { Component, EventEmitter, Output } from '@angular/core';
import { NextConfig } from '../../../../app-config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public flatConfig: any;

  public menuClass: boolean;

  public collapseStyle: string;

  public windowWidth: number;

  @Output() navCollapse = new EventEmitter();

  @Output() navHeaderMobCollapse = new EventEmitter();

  constructor() {
    this.flatConfig = NextConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }

  collapse() {
    if (this.windowWidth >= 992) {
      this.navCollapse.emit();
    } else {
      this.navHeaderMobCollapse.emit();
    }
  }
}
