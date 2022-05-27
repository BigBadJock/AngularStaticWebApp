import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganisationStats } from 'src/app/models/organisationStats';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  apiHost = environment.apiHost;

  constructor(private http: HttpClient) {}

getStats(organisationId: string): Observable<OrganisationStats> {
    return this.http.get<OrganisationStats>(`${this.apiHost}/api/organisation/stats/${organisationId}`);
  }
}
