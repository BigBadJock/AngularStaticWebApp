import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListSearchDisplayComponent } from './waiting-list-search-display.component';

describe('WaitingListDisplayComponent', () => {
  let component: WaitingListSearchDisplayComponent;
  let fixture: ComponentFixture<WaitingListSearchDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListSearchDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListSearchDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
