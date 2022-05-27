import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { PlotWithRentals } from 'src/app/models/plotWithRentals.model';

@Injectable({ providedIn: 'root' })
export class PlotWithRentalsEntityService extends EntityCollectionServiceBase<PlotWithRentals> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PlotWithRentals', serviceElementsFactory);
  }
}
