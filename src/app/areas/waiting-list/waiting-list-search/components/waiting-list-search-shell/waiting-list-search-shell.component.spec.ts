import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WaitingListSearchShellComponent } from './waiting-list-search-shell.component';

describe('WaitingListSearchShellComponent', () => {
  let component: WaitingListSearchShellComponent;
  let fixture: ComponentFixture<WaitingListSearchShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WaitingListSearchShellComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListSearchShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
