import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator} from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlotRentalHistory } from 'src/app/models/plotRentalHistory.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlotRentalHistoryDataService extends DefaultDataService<PlotRentalHistory> {
  apiHost: string = environment.apiHost;
  
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super('PlotRentalHistory', http, httpUrlGenerator, config);
  }
  
  getWithQuery(query:string): Observable<PlotRentalHistory[]> {
    console.log(`${this.apiHost}/api/plotRentalHistory/query/${query}`);
    return this.http.get<PlotRentalHistory[]>(`${this.apiHost}/api/plotRentalHistory/query/${query}`).pipe(map((res: any) => res.data));
  }
}


