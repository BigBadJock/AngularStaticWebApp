import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteModifyDisplayComponent } from './site-modify-display.component';

describe('SiteModifyDisplayComponent', () => {
  let component: SiteModifyDisplayComponent;
  let fixture: ComponentFixture<SiteModifyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteModifyDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteModifyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
