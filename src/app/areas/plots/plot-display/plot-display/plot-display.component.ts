import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plot } from 'src/app/models/plot.model';
import { PlotRentalHistory } from 'src/app/models/plotRentalHistory.model';
import { ColumnDefinition } from 'src/app/shared/datagrid/models/column-definition.model';

@Component({
  selector: 'app-plot-display',
  templateUrl: './plot-display.component.html',
  styleUrls: ['./plot-display.component.scss']
})
export class PlotDisplayComponent implements OnInit {
  @Input() plot: Plot;
  @Input() currentTenancy: PlotRentalHistory;
  @Input() historicalTenancies: PlotRentalHistory[];
  @Output() editPlotClicked = new EventEmitter();
  @Output() closeClicked = new EventEmitter();
  
  
  columnDefinitions: ColumnDefinition[];

  constructor() { }

  ngOnInit(): void {
      this.columnDefinitions = [
        { name: 'startDate', header: 'Start Date', dataType: 'date'},
        { name: 'endDate', header: 'End Date', dataType: 'date' },
        { name: 'paymentStatus', header: 'paymentStatus', dataType: 'string' },
        { name: 'title', header: 'Title', dataType: 'string' },
        { name: 'firstName', header: 'First Name', dataType: 'string' },
        { name: 'lastName', header: 'Last Name', dataType: 'string' },
    ];
  }

  editPlot() {
    this.editPlotClicked.emit('true');
  }

  close() {
    this.closeClicked.emit('true');
  }

}
