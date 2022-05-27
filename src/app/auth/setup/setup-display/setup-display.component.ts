import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { AddressServiceResult } from 'src/app/models/AddressServiceResult';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-setup-display',
  templateUrl: './setup-display.component.html',
  styleUrls: ['./setup-display.component.scss'],
})
export class SetupDisplayComponent {
  @Output() formSubmitted = new EventEmitter();

  setupForm: FormGroup;

  settingsForm: FormGroup;

  searchAddresses: AddressServiceResult;

  constructor(private fb: FormBuilder, private addressService: AddressService) {
    this.setupForm = fb.group({
      organisation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      postCodeSearch: [''],
      selectedAddress: [],
      addressLine1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      addressLine2: ['', [Validators.maxLength(100)]],
      addressLine3: ['', [Validators.maxLength(100)]],
      addressLine4: ['', [Validators.maxLength(100)]],
      locality: ['', [Validators.maxLength(100)]],
      townOrCity: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      county: ['', [Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      postcode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    });

    this.settingsForm = fb.group({
      measurement: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      yearStart: [formatDate(new Date(), 'dd/MM/yyyy', 'en-gb', 'GMT'), [Validators.required]],
    });
  }

  searchForAddress() {
    this.addressService
      .addressSearch(this.postCodeSearch.value)
      // eslint-disable-next-line no-return-assign
      .subscribe((addresses) => {
        this.searchAddresses = addresses;
        this.setupForm.get('selectedAddress').setValue(this.searchAddresses.addresses[0]);
      });
  }

  selectAddress() {
    const a: Address = this.selectedAddress.value;
    this.addressLine1.setValue(a.line_1);
    this.addressLine2.setValue(a.line_2);
    this.addressLine3.setValue(a.line_3);
    this.addressLine4.setValue(a.line_4);
    this.locality.setValue(a.locality);
    this.townOrCity.setValue(a.town_or_city);
    this.county.setValue(a.county);
    this.country.setValue(a.country);
    this.postcode.setValue(this.searchAddresses.postcode);
  }

  submitForm(): void {
    this.formSubmitted.emit({ setupForm: this.setupForm.value, settings: this.settingsForm.value });
  }

  get organisation() {
    return this.setupForm.get('organisation');
  }

  get postCodeSearch() {
    return this.setupForm.get('postCodeSearch');
  }

  get selectedAddress() {
    return this.setupForm.get('selectedAddress');
  }

  get addressLine1() {
    return this.setupForm.get('addressLine1');
  }

  get addressLine2() {
    return this.setupForm.get('addressLine2');
  }

  get addressLine3() {
    return this.setupForm.get('addressLine3');
  }

  get addressLine4() {
    return this.setupForm.get('addressLine4');
  }

  get locality() {
    return this.setupForm.get('locality');
  }

  get townOrCity() {
    return this.setupForm.get('townOrCity');
  }

  get county() {
    return this.setupForm.get('county');
  }

  get country() {
    return this.setupForm.get('country');
  }

  get postcode() {
    return this.setupForm.get('postcode');
  }

  get measurement() {
    return this.settingsForm.get('measurement');
  }

  get cost() {
    return this.settingsForm.get('cost');
  }

  get yearStart() {
    return this.settingsForm.get('yearStart');
  }
}
