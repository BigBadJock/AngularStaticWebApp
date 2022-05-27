import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator } from "@ngrx/data";
import { Plot } from "src/app/models/plot.model";
import { environment } from "src/environments/environment";

@Injectable()
export class PlotDataService extends DefaultDataService<Plot>{
  apiHost: string = environment.apiHost;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, config: DefaultDataServiceConfig) {
    super('Plot', http, httpUrlGenerator, config);
  }
  
}
