import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Lightbox, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GalleryComponent],
        providers: [Lightbox, LightboxConfig, LightboxEvent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
