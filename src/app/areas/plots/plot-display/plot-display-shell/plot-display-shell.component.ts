import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { Plot } from 'src/app/models/plot.model';
import { Subscription } from 'rxjs';
import { PlotRentalHistory } from 'src/app/models/plotRentalHistory.model';
import { PlotUpdateShellComponent } from '../../plot-update/plot-update-shell/plot-update-shell.component';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlotEntityService } from 'src/app/store/plot-entity-service';
import { PlotRentalHistoryEntityService } from 'src/app/store/plot-rental-history-entity-service';

@Component({
  selector: 'app-plot-display-shell',
  templateUrl: './plot-display-shell.component.html',
  styleUrls: ['./plot-display-shell.component.scss']
})
export class PlotDisplayShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  
  siteName: string;
  plotId: string;
  plot: Plot;
  currentTenancy: PlotRentalHistory;
  historicalTenancies: PlotRentalHistory[];
  showingModal: boolean;
  modalRef: any;
  site: any;

  constructor(
    private plotEntityService: PlotEntityService,
    private plotRentalHistoryEntityService: PlotRentalHistoryEntityService,
    private breadCrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.siteName = params.siteName;
      this.plotId = params.id;
      this.loadPlot();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadPlot() {

    this.subscriptions.add(
      this.plotEntityService.getByKey(this.plotId).subscribe((plot: Plot) => {
        this.plot = plot;
        const b = new Breadcrumb(`${this.siteName}:${this.plot.name}`, `/plots/display/${this.plot.id}/${this.siteName}`);
        this.breadCrumbService.add(b);
      })
    );


    const rentalQuery = `plotId[eq]=${this.plotId}`;

    this.subscriptions.add(
      this.plotRentalHistoryEntityService.getWithQuery(rentalQuery).subscribe((histories: PlotRentalHistory[]) => {
        const current = histories.filter(h => h.isCurrent);
        if (current.length > 0) {
          this.currentTenancy = current[0];
        } else {
          this.currentTenancy = null;
        }
        this.historicalTenancies = histories.filter(h => ! h.isCurrent);
      })
    );
  }

  openModifyModal(){
    this.showingModal = true;

    this.modalRef = this.modalService.open(PlotUpdateShellComponent);
    this.modalRef.componentInstance.plot = this.plot;
    this.modalRef.componentInstance.reloadEmitter.subscribe(() => {
      this.loadPlot();
    })
  }




}
