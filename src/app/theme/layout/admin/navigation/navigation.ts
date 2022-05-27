import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

@Injectable()
export class NavigationItem {
  navigationItems = [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'feather icon-monitor',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard',
          classes: 'nav-item',
          icon: 'fas fa-tachometer-alt',
        },
        {
          id: 'configuration',
          title: 'Configuration',
          type: 'item',
          url: '/organisation/configuration',
          classes: 'nav-item',
          icon: 'fas fa-cog',
        },
        {
          id: 'sites',
          title: 'Sites',
          type: 'item',
          url: '/sites',
          classes: 'nav-item',
          icon: 'fas fa-map-marker-alt',
        },
        {
          id: 'payments',
          title: 'Invoices',
          type: 'item',
          url: '/payments',
          classes: 'nav-item',
          icon: 'far fa-money-bill-alt',
        },
        {
          id: 'tenants',
          title: 'Tenants',
          type: 'item',
          url: '/tenants',
          classes: 'nav-item',
          icon: 'fas fa-users',
        },

        {
          id: 'waitinglist',
          title: 'Waiting List',
          type: 'item',
          url: '/waitinglist',
          classes: 'nav-item',
          icon: 'fas fa-clipboard-list',
        },
      ],
    },
  ];

  public get() {
    return this.navigationItems;
  }
}
