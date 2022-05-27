import { EntityMetadataMap } from '@ngrx/data';
import { comparePlotWithRentals } from 'src/app/models/plotWithRentals.model';
import { compareSites } from 'src/app/models/site.model';
import { comparePlots } from '../models/plot.model';
import { comparePlotRentalHistory } from '../models/plotRentalHistory.model';
import { compareWaitingList } from '../models/waiting-list.model';

export const entityMetadata: EntityMetadataMap = {
  Site: {
    sortComparer: compareSites,
  },
  PlotWithRentals: {
    sortComparer: comparePlotWithRentals,
  },
    Plot: {
    sortComparer: comparePlots,
  },
  PlotRentalHistory: {
    sortComparer: comparePlotRentalHistory,
  },
  WaitingList: {
    sortComparer: compareWaitingList,
  },
};



const pluralNames = {
  Plot: 'plot',
  PlotRentalHistory: 'plotRentalHistory',
  Site: 'sites',
  PlotWithRentals: 'plotWithRentals',
  WaitingList: 'waitingList'
};

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
