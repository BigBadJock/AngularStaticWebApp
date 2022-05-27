import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { PlotRentalHistory } from 'src/app/models/plotRentalHistory.model';

@Injectable({ providedIn: 'root' })
export class PlotRentalHistoryEntityService extends EntityCollectionServiceBase<PlotRentalHistory> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PlotRentalHistory', serviceElementsFactory);
  }
}
