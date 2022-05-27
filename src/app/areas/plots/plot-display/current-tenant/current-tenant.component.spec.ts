import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTenantComponent } from './current-tenant.component';

describe('CurrentTenantComponent', () => {
  let component: CurrentTenantComponent;
  let fixture: ComponentFixture<CurrentTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
