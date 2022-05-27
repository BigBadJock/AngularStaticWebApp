import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NavGroupComponent } from './nav-group.component';
import { NavigationItem } from '../../navigation';
import { NavCollapseComponent } from '../nav-collapse/nav-collapse.component';
import { NavItemComponent } from '../nav-item/nav-item.component';

describe('NavGroupComponent', () => {
  let component: NavGroupComponent;
  let fixture: ComponentFixture<NavGroupComponent>;
  const item: NavigationItem = new NavigationItem();
  let layout1: boolean;
  let activeId: string;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavGroupComponent, NavCollapseComponent, NavItemComponent],
        imports: [RouterTestingModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavGroupComponent);
    component = fixture.componentInstance;
    component.item = item;
    component.layout1 = layout1;
    component.activeId = activeId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
