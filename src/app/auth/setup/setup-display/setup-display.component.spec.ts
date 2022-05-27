import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { WizardComponent, WizardStepComponent } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from 'src/app/services/address.service';
import { SetupDisplayComponent } from './setup-display.component';

describe('SetupDisplayComponent', () => {
  let component: SetupDisplayComponent;
  let fixture: ComponentFixture<SetupDisplayComponent>;
  // let service: AddressService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
        declarations: [SetupDisplayComponent, MockComponent(WizardComponent), MockComponent(WizardStepComponent)],
        providers: [FormBuilder, AddressService],
      }).compileComponents();
    }),
  );

  beforeEach(async () => {
    fixture = TestBed.createComponent(SetupDisplayComponent);
    component = fixture.componentInstance;
    // service = TestBed.get(AddressService);
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
