import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListUpdateDisplayComponent } from './waiting-list-update-display.component';

describe('WaitingListUpdateDisplayComponent', () => {
  let component: WaitingListUpdateDisplayComponent;
  let fixture: ComponentFixture<WaitingListUpdateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListUpdateDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListUpdateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
