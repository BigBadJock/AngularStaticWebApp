import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Plot } from 'src/app/models/plot.model';


@Injectable({ providedIn: 'root' })
export class PlotEntityService extends EntityCollectionServiceBase<Plot> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Plot', serviceElementsFactory);
  }
}
