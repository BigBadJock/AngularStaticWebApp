import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WaitingList } from '../models/waiting-list.model';

@Injectable()
export class WaitingListDataService extends DefaultDataService<WaitingList> {
  apiHost: string = environment.apiHost;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super('WaitingList', http, httpUrlGenerator, config);
  }

  getWithQuery(query:string): Observable<WaitingList[]> {
    console.log(`${this.apiHost}/api/waitingList/query/${query}`);
    return this.http.get<WaitingList[]>(`${this.apiHost}/api/waitingList/query/${query}`).pipe(map((res: any) => res.data));
  }
}
