import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { Site } from 'src/app/models/site.model';
import { SiteCardComponent } from '../site-card/site-card.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SiteSearchDisplayComponent } from './site-search-display.component';
import { ExpectedConditions } from 'protractor';

describe('SiteSearchDisplayComponent', () => {
  let spectator: Spectator<SiteSearchDisplayComponent>;
  const createComponent = createComponentFactory(SiteSearchDisplayComponent);

  beforeEach(() => spectator = createComponent());



  test('should create', () => {
    expect(createComponent).toBeTruthy();
  });

  test('should have an add button', () => {
    expect(spectator.query('#addButton')).toBeTruthy();
    expect(spectator.query('#addButton').innerHTML).toBe('+');
  });

  test('add button should emit addClicked when clicked', () => {
    spyOn(spectator.component.addClicked, 'emit');
    const button = spectator.query('#addButton');
    spectator.click(button);
    spectator.detectChanges();
    expect(spectator.component.addClicked.emit).toHaveBeenCalledTimes(1);

  });
});
