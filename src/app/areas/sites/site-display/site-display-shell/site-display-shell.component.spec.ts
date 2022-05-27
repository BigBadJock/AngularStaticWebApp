import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { PlotWithRentalsEntityService } from '../../../../store/plotWithRentals-entity.service';
import { SiteEntityService } from '../../store/site-entity.service';
import { DisplayComponent } from '../display/display.component';

import { SiteDisplayShellComponent } from './site-display-shell.component';

describe('SiteDisplayShellComponent', () => {
  let component: SiteDisplayShellComponent;
  let fixture: ComponentFixture<SiteDisplayShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteDisplayShellComponent, MockComponent(DisplayComponent)],
      providers: [
        MockProvider(SiteEntityService),
        MockProvider(PlotWithRentalsEntityService),
        MockProvider(BreadcrumbService),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'aaaa-bbbb' }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDisplayShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
