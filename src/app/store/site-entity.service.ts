import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Site } from 'src/app/models/site.model';

@Injectable({ providedIn: 'root' })
export class SiteEntityService extends EntityCollectionServiceBase<Site> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Site', serviceElementsFactory);
  }
}
