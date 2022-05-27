import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListUpdateShellComponent } from './waiting-list-update-shell.component';

describe('WaitingListUpdateShellComponent', () => {
  let component: WaitingListUpdateShellComponent;
  let fixture: ComponentFixture<WaitingListUpdateShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListUpdateShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListUpdateShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
