import { baseModel } from './base.model';

export class PlotWithRentals extends baseModel {
  name: string;

  size: number;

  isCurrentlyRented: boolean;

  isUnderOffer: boolean;

  isUncultivated: boolean;

  customerId: string;

  firstName: string;

  lastName: string;

  startDate: Date;

  endDate: Date;

  paymentStatusId: string;

  paymentStatus: string;
}

export function comparePlotWithRentals(s1: PlotWithRentals, s2: PlotWithRentals) {
  if (s1.name < s2.name) return -1;
  if (s1.name > s2.name) return 1;
  return 0;
}
