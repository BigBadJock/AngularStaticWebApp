import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlotWithRentals } from 'src/app/models/plotWithRentals.model';

@Injectable()
export class PlotWithRentalsDataService extends DefaultDataService<PlotWithRentals> {
  apiHost: string = environment.apiHost;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('PlotWithRentals', http, httpUrlGenerator);
  }

  getWithQuery(siteId: string): Observable<PlotWithRentals[]> {
    return this.http
      .get<PlotWithRentals[]>(`${this.apiHost}/api/plotsWithRentals/siteId=${siteId}&$sort_by=name`)
      .pipe(map((res: any) => res.data));
  }
}
