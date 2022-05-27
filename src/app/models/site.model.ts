import { baseModel } from './base.model';
import { Plot } from './plot.model';

export class Site extends baseModel {
  name: string;

  numberOfPlots: number;

  organisationId: string;

  plotsUnderOffer: number;

  totalFees: number;

  uncultivatedPlots: number;

  unletPlots: number;

  unpaidFees: number;

  unpaidPlots: number;

  waitingList: number;

  plots: Plot[];
}

export function compareSites(s1: Site, s2: Site) {
  if (s1.name < s2.name) return -1;
  if (s1.name > s2.name) return 1;
  return 0;
}
