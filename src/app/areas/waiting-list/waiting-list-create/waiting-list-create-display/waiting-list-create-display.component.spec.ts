import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListCreateDisplayComponent } from './waiting-list-create-display.component';

describe('WaitingListCreateDisplayComponent', () => {
  let component: WaitingListCreateDisplayComponent;
  let fixture: ComponentFixture<WaitingListCreateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListCreateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListCreateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
