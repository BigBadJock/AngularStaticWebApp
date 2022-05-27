import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NavItemComponent } from './nav-item.component';
import { NavigationItem } from '../../navigation';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;
  const navItem: NavigationItem = new NavigationItem();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavItemComponent],
        imports: [RouterTestingModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    component.item = navItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
