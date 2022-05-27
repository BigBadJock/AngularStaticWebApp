import { Component, NgZone, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NextConfig } from '../../../app-config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public flatConfig: any;

  public navCollapsed: boolean;

  public navCollapsedMob: boolean;

  public windowWidth: number;

  constructor(private zone: NgZone, private location: Location) {
    this.flatConfig = NextConfig.config;
    let currentURL = this.location.path();
    const baseHref = this.location.prepareExternalUrl('');
    if (baseHref) {
      currentURL = baseHref + this.location.path();
    }

    this.windowWidth = window.innerWidth;

    if (
      currentURL === `${baseHref}/layout/collapse-menu` ||
      currentURL === `${baseHref}/layout/box` ||
      (this.windowWidth >= 992 && this.windowWidth <= 1024)
    ) {
      this.flatConfig.collapseMenu = true;
    }

    this.navCollapsed = this.windowWidth >= 992 ? this.flatConfig.collapseMenu : false;
    this.navCollapsedMob = false;
  }

  ngOnInit() {
    if (this.windowWidth < 992) {
      this.flatConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = '100%'; // 100% amit
      }, 500);
    }
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (
        this.navCollapsedMob &&
        !document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')
      ) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

  toggleCollapse() {
    this.navCollapsed = !this.navCollapsed;
  }
}
