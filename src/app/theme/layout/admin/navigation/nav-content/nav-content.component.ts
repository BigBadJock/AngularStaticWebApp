import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/reducers';
import { AuthActions } from 'src/app/auth/store/action-types';
import { NextConfig } from '../../../../../app-config';
import { NavigationItem } from '../navigation';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss'],
})
export class NavContentComponent implements OnInit, AfterViewInit {
  user: User;

  username: string;

  firstName: string;

  lastName: string;

  public flatConfig: any;

  public navigation: any;

  public prevDisabled: string;

  public nextDisabled: string;

  public contentWidth: number;

  public wrapperWidth: any;

  public scrollWidth: any;

  public windowWidth: number;

  public isNavProfile: boolean;

  @Output() navMobCollapse = new EventEmitter();

  @ViewChild('navbarContent') navbarContent: ElementRef;

  @ViewChild('navbarWrapper') navbarWrapper: ElementRef;

  constructor(private store: Store<AppState>, public nav: NavigationItem, private location: Location) {
    this.flatConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    this.navigation = this.nav.get();
    this.prevDisabled = 'disabled';
    this.nextDisabled = '';
    this.scrollWidth = 0;
    this.contentWidth = 0;
    this.isNavProfile = false;
  }

  ngOnInit() {
      this.store.pipe(select(getCurrentUser)).subscribe((user: User) => {
          if (user != null) {
              this.user = user;
              this.firstName = user.firstName;
              this.lastName = user.lastName;
          }
    });
    if (this.windowWidth < 992) {
      this.flatConfig.layout = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-flat-able') as HTMLElement).style.maxHeight = '100%';
      }, 500);
    }
  }

  ngAfterViewInit() {
    if (this.flatConfig.layout === 'horizontal') {
      this.contentWidth = this.navbarContent.nativeElement.clientWidth;
      this.wrapperWidth = this.navbarWrapper.nativeElement.clientWidth;
    }
  }

  scrollPlus() {
    this.scrollWidth += this.wrapperWidth - 80;
    if (this.scrollWidth > this.contentWidth - this.wrapperWidth) {
      this.scrollWidth = this.contentWidth - this.wrapperWidth + 80;
      this.nextDisabled = 'disabled';
    }
    this.prevDisabled = '';
    if (this.flatConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = `-${this.scrollWidth}px`;
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = `-${this.scrollWidth}px`;
    }
  }

  scrollMinus() {
    this.scrollWidth -= this.wrapperWidth;
    if (this.scrollWidth < 0) {
      this.scrollWidth = 0;
      this.prevDisabled = 'disabled';
    }
    this.nextDisabled = '';
    if (this.flatConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = `-${this.scrollWidth}px`;
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = `-${this.scrollWidth}px`;
    }
  }

  fireLeave() {
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
  }

  navMob() {
    if (
      this.windowWidth < 992 &&
      document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')
    ) {
      this.navMobCollapse.emit();
    }
  }

  fireOutClick() {
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
        if (this.flatConfig.layout === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if (upParent.classList.contains('pcoded-hasmenu')) {
        if (this.flatConfig.layout === 'vertical') {
          upParent.classList.add('pcoded-trigger');
        }
        upParent.classList.add('active');
      } else if (lastParent.classList.contains('pcoded-hasmenu')) {
        if (this.flatConfig.layout === 'vertical') {
          lastParent.classList.add('pcoded-trigger');
        }
        lastParent.classList.add('active');
      }
    }
  }

  signOut() {
    this.store.dispatch(AuthActions.SignOut());
  }
}
