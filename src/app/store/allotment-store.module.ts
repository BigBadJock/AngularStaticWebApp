import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService, EntityDataService } from '@ngrx/data';
import { WaitingListDataService } from '../services/waiting-list-data.service';
import { entityMetadata } from './entity-metadata';
import { PlotWithRentalsDataService } from '../services/plotWithRentals-data.service';
import { SiteDataService } from '../services/site-data.service';
import { PlotDataService } from '../services/plot-data.service';
import { PlotRentalHistoryDataService } from '../services/plot-rental-history.service';
import { SiteResolver } from '../areas/sites/SiteResolver';
import { PlotWithRentalsEntityService } from './plotWithRentals-entity.service';
import { SiteEntityService } from './site-entity.service';
import { PlotRentalHistoryEntityService } from './plot-rental-history-entity-service';
import { PlotEntityService } from './plot-entity-service';
import { WaitingListEntityService } from './waiting-list-entity.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PlotDataService,
    PlotEntityService,
    PlotRentalHistoryDataService,    
    PlotRentalHistoryEntityService,
    PlotWithRentalsDataService,
    PlotWithRentalsEntityService,
    SiteEntityService,
    SiteDataService,
    WaitingListDataService,
    WaitingListEntityService,
  ]
})
export class AllotmentStoreModule {
  
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private plotDataService: PlotDataService,
    private plotRentalHistoryDataService: PlotRentalHistoryDataService,    
    private plotWithRentalsService: PlotWithRentalsDataService,
    private siteDataService: SiteDataService,
    private waitingListDataService: WaitingListDataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Plot', plotDataService);
    entityDataService.registerService('PlotRentalHistory', plotRentalHistoryDataService);    
    entityDataService.registerService('PlotWithRentals', plotWithRentalsService);
    entityDataService.registerService('Site', siteDataService);
    entityDataService.registerService('WaitingList', waitingListDataService);
  }



}
