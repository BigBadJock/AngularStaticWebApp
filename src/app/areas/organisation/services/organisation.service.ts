import { Injectable } from '@angular/core';
import { Organisation } from 'src/app/models/organisation.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  apiHost = environment.apiHost;

  constructor(private http: HttpClient) {}

  loadOrganisation(organisationId: string): Observable<Organisation> {
    return this.http.get<Organisation>(`${this.apiHost}/api/organisation/${organisationId}`);
  }
}
