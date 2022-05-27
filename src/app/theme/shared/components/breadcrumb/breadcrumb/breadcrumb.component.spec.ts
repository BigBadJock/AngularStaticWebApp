import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';
import { Breadcrumb } from '../models/breadcrumb.model';
import { BreadcrumbService } from '../services/breadcrumb.service';

import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let service: BreadcrumbService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [BreadcrumbService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BreadcrumbService);
    fixture.detectChanges();
  });

  test('should create', () => {
    const history = [new Breadcrumb('title', 'url')];
    const result = cold('-a|', history);

    service.history$ = result;
    expect(component).toBeTruthy();
  });
});
