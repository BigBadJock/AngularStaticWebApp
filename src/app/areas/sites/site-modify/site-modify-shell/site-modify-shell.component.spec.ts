import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteModifyShellComponent } from './site-modify-shell.component';

describe('SiteModifyShellComponent', () => {
  let component: SiteModifyShellComponent;
  let fixture: ComponentFixture<SiteModifyShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteModifyShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteModifyShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
