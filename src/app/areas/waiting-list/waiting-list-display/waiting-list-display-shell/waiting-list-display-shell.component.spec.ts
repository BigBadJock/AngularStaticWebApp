import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListDisplayShellComponent } from './waiting-list-display-shell.component';

describe('WaitingListDisplayShellComponent', () => {
  let component: WaitingListDisplayShellComponent;
  let fixture: ComponentFixture<WaitingListDisplayShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListDisplayShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListDisplayShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
