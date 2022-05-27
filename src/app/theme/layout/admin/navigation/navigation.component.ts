import { Component, EventEmitter, Output } from '@angular/core';
import { NextConfig } from '../../../../app-config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public windowWidth: number;

  public flatConfig: any;

  @Output() navMobCollapse = new EventEmitter();

  constructor() {
    this.flatConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
  }

  collapse() {
    if (this.windowWidth < 992) {
      this.navMobCollapse.emit();
    }
  }
}
