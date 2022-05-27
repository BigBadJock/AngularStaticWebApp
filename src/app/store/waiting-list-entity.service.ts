import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { WaitingList } from '../models/waiting-list.model';

@Injectable({ providedIn: 'root' })
export class WaitingListEntityService extends EntityCollectionServiceBase<WaitingList> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('WaitingList', serviceElementsFactory);
  }
}
