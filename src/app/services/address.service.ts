/* eslint-disable no-template-curly-in-string */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddressServiceResult } from '../models/AddressServiceResult';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiKey = environment.getAddressIoAPIKey;

  constructor(private http: HttpClient) {}

  addressSearch(postcode: string): Observable<AddressServiceResult> {
    const encodedPostCode = encodeURIComponent(postcode);
    const url = `https://api.getAddress.io/find/${encodedPostCode}?api-key=${this.apiKey}&sort=true&expand=true`;
    return this.http.get<AddressServiceResult>(url);
  }
}
