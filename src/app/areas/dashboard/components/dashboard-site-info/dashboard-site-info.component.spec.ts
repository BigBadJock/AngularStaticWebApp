import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

import { DashboardSiteInfoComponent } from './dashboard-site-info.component';

describe('DashboardSiteInfoComponent', () => {
  let component: DashboardSiteInfoComponent;
  let fixture: ComponentFixture<DashboardSiteInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardSiteInfoComponent, MockComponent(CardComponent)],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSiteInfoComponent);
    component = fixture.componentInstance;
    component.organisationStats = new OrganisationStats();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
