import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { SiteSearchShellComponent } from './site-search-shell.component';
import { SiteEntityService } from '../../store/site-entity.service';
import { SiteSearchDisplayComponent } from '../site-search-display/site-search-display.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';

describe('SiteSearchShellComponent', () => {
  let component: SiteSearchShellComponent;
  let fixture: ComponentFixture<SiteSearchShellComponent>;
  const mockSiteEntityService = jest.fn();
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SiteSearchShellComponent, MockComponent(SiteSearchDisplayComponent)],
        providers: [{ provide: SiteEntityService, useValue: mockSiteEntityService, }, BreadcrumbService],
        imports:[RouterTestingModule]
      }).compileComponents();

      router = TestBed.inject(Router);
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSearchShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should route to sites/create when addCreate event called', () => {
    jest.spyOn(component, 'addClicked');
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.addClicked();
    fixture.detectChanges();
    expect(component.addClicked).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledTimes(1);
    expect(navigateSpy).toBeCalledWith('/sites/create');      
  });
});

