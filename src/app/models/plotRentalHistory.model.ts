import { baseModel } from "./base.model";

export class PlotRentalHistory extends baseModel {
  organisationId: string;
  plotId: string;
  plotName: string;
  startDate: Date;
  endDate: Date;
  paymentStatus: string;
  tenantId: string;
  title: string;
  firstName: string;
  lastName: string;
  isCurrent: boolean;
}

export function comparePlotRentalHistory(s1: PlotRentalHistory, s2: PlotRentalHistory) {
  if (s1.plotId < s2.plotId) return -1;
  if (s1.plotId > s2.plotId) return 1;
  return 0;
}
