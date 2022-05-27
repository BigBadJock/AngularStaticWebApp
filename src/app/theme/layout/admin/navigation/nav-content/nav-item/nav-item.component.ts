import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationItem } from '../../navigation';
import { NextConfig } from '../../../../../../app-config';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
  @Input() item: NavigationItem;

  public flatConfig: any;

  public themeLayout: string;

  constructor(private location: Location) {
    this.flatConfig = NextConfig.config;
    this.themeLayout = this.flatConfig.layout;
  }

  closeOtherMenu(event) {
    if (this.flatConfig.layout === 'vertical') {
      const ele = event.target;
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const upParent = parent.parentElement.parentElement;
        const lastParent = upParent.parentElement;
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < sections.length; i += 1) {
          sections[i].classList.remove('active');
          sections[i].classList.remove('pcoded-trigger');
        }

        if (parent.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('pcoded-trigger');
          parent.classList.add('active');
        } else if (upParent.classList.contains('pcoded-hasmenu')) {
          upParent.classList.add('pcoded-trigger');
          upParent.classList.add('active');
        } else if (lastParent.classList.contains('pcoded-hasmenu')) {
          lastParent.classList.add('pcoded-trigger');
          lastParent.classList.add('active');
        }
      }
      if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
        document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
      }
    } else {
      setTimeout(() => {
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < sections.length; i += 1) {
          sections[i].classList.remove('active');
          sections[i].classList.remove('pcoded-trigger');
        }

        let currentUrl = this.location.path();
        if (this.location.prepareExternalUrl('')) {
          currentUrl = this.location.prepareExternalUrl('') + this.location.path();
        }
        const link = `a.nav-link[ href='${currentUrl}' ]`;
        const ele = document.querySelector(link);
        if (ele !== null && ele !== undefined) {
          const parent = ele.parentElement;
          const upParent = parent.parentElement.parentElement;
          const lastParent = upParent.parentElement;
          if (parent.classList.contains('pcoded-hasmenu')) {
            parent.classList.add('active');
          } else if (upParent.classList.contains('pcoded-hasmenu')) {
            upParent.classList.add('active');
          } else if (lastParent.classList.contains('pcoded-hasmenu')) {
            lastParent.classList.add('active');
          }
        }
      }, 500);
    }
  }
}
