import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PlotWithRentals } from 'src/app/models/plotWithRentals.model';
import { Site } from 'src/app/models/site.model';
import { ColumnDefinition } from 'src/app/shared/datagrid/models/column-definition.model';
import { PageControl } from 'src/app/shared/datagrid/models/pageControl.model';

@Component({
  selector: 'app-site-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit, OnChanges {
  @Input() site: Site;

  @Input() plots: PlotWithRentals[];

  @Output() editSiteClicked = new EventEmitter();

  @Output() plotUpdateClicked = new EventEmitter();


  allPlots: PlotWithRentals[];

  uncultivatedPlots: PlotWithRentals[];

  unrentedPlots: PlotWithRentals[];

  displayPlots: PlotWithRentals[] = [];

  pagination: PageControl;

  columnDefinitions: ColumnDefinition[] = [];

  siteName: string;

  ngOnInit(): void {
    this.pagination = new PageControl();
  }

  ngOnChanges(): void {
    if (this.site && this.plots) {
      this.allPlots = this.plots;
      this.uncultivatedPlots = this.plots.filter((x) => x.isUncultivated === true);
      this.unrentedPlots = this.plots.filter((x) => x.isCurrentlyRented === false);

      this.displayPlots = this.allPlots;

      const routerLinkData = [
        this.site.name
      ]

      this.columnDefinitions = [
        { name: 'name', header: 'Plot', dataType: 'link', routerLink: '/plots/display', linkData: routerLinkData },
        { name: 'isCurrentlyRented', header: 'Rented', dataType: 'boolean' },
        { name: 'isUncultivated', header: 'Uncultivated', dataType: 'boolean' },
        { name: 'size', header: 'Size', dataType: 'number' },
        { name: 'firstName', header: 'First Name', dataType: 'string' },
        { name: 'lastName', header: 'Last Name', dataType: 'string' },
        { name: 'startDate', header: 'Tenancy Start', dataType: 'date' },
        { name: 'endDate', header: 'Tenancy End', dataType: 'date' },
        { name: 'paymentStatus', header: 'Payment Status', dataType: 'string' },
        { name: 'id', header: 'Edit', dataType: 'button', buttonText: 'Edit', buttonEventEmitter: this.plotUpdateClicked}
      ];
    }
  }

  display(displayType: string) {
    switch (displayType) {
      case 'unrented':
        this.displayPlots = this.unrentedPlots;
        break;
      case 'uncultivated':
        this.displayPlots = this.uncultivatedPlots;
        break;
      default:
        this.displayPlots = this.allPlots;
        break;
    }
  }

  editPlot(plotId: string) {
    let event = { 'plotId': plotId };
    this.editSiteClicked.emit(plotId);
  }

  editSiteClick() {
    this.editSiteClicked.emit('true');
  }



}
