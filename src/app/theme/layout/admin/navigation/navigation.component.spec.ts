import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideDirective } from 'ng-click-outside';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockDirective } from 'ng-mocks';
import { NavContentComponent } from './nav-content/nav-content.component';
import { NavigationComponent } from './navigation.component';
import { NavGroupComponent } from './nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './nav-content/nav-item/nav-item.component';
import { NavigationItem } from './navigation';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          NavigationComponent,
          MockComponent(NavContentComponent),
          MockComponent(NavGroupComponent),
          MockComponent(NavCollapseComponent),
          MockComponent(NavItemComponent),
          MockDirective(ClickOutsideDirective),
        ],
        imports: [RouterTestingModule, PerfectScrollbarModule],
        providers: [NavigationItem],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
