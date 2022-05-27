import { EntitySelectorsFactory } from "@ngrx/data";
import { Plot } from "src/app/models/plot.model";


export const plotSelectors = new EntitySelectorsFactory().create<Plot>('Plot');

export interface PlotState{

}
