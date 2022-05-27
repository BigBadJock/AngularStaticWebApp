import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListCreateShellComponent } from './waiting-list-create-shell.component';

describe('WaitingListCreateShellComponent', () => {
  let component: WaitingListCreateShellComponent;
  let fixture: ComponentFixture<WaitingListCreateShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListCreateShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListCreateShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
