import { baseModel } from './base.model';

export class Plot extends baseModel {
  name: string;

  size: number;

  isCurrentlyRented: boolean;

  isUnderOffer: boolean;

  isUncultivated: boolean;

  customerId: string;
}

export function comparePlots(a: Plot, b: Plot) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
