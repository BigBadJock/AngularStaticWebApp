import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListDisplayDisplayComponent } from './waiting-list-display-display.component';

describe('WaitingListDisplayDisplayComponent', () => {
  let component: WaitingListDisplayDisplayComponent;
  let fixture: ComponentFixture<WaitingListDisplayDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListDisplayDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListDisplayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
