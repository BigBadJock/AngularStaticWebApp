import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { Site } from 'src/app/models/site.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class SiteDataService extends DefaultDataService<Site> {
  apiHost: string = environment.apiHost;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super('Site', http, httpUrlGenerator, config);
  }

  getWithQuery(query:string): Observable<Site[]> {
    console.log(`${this.apiHost}/api/sites/query/${query}`);
    return this.http.get<Site[]>(`${this.apiHost}/api/site/query/${query}`).pipe(map((res: any) => res.data));
  }
}
