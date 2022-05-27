import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from 'ng-click-outside';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { ConfigurationComponent } from './layout/admin/configuration/configuration.component';
import { NavigationComponent } from './layout/admin/navigation/navigation.component';
import { NavBarComponent } from './layout/admin/nav-bar/nav-bar.component';
import { NavCollapseComponent } from './layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavContentComponent } from './layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavLeftComponent } from './layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './layout/admin/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavigationItem } from './layout/admin/navigation/navigation';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AdminComponent,
    BreadcrumbComponent,
    ClickOutsideDirective,
    ConfigurationComponent,
    NavigationComponent,
    NavBarComponent,
    NavCollapseComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
  ],
  imports: [PerfectScrollbarModule, RouterModule],
  providers: [NavigationItem],
})
export class ThemeModule {}
