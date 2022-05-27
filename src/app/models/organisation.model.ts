import { baseModel } from './base.model';

export class Organisation extends baseModel {
  name: string;

  addressLine1: string;

  addressLine2: string;

  addressLine3: string;

  addressLine4: string;

  locality: string;

  townOrCity: string;

  county: string;

  country: string;

  postCode: string;

  settings: string;

  constructor(
    name: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    addressLine4: string,
    locality: string,
    townOrCity: string,
    county: string,
    country: string,
    postCode: string,
    settings: string
  ) {
    super();
    this.name = name;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.addressLine3 = addressLine3;
    this.addressLine4 = addressLine4;
    this.locality = locality;
    this.townOrCity = townOrCity;
    this.county = county;
    this.country = country;
    this.postCode = postCode;
    this.settings = settings;
  }
}
