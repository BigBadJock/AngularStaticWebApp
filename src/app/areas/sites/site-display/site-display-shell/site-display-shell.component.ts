import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntitySelectorsFactory } from '@ngrx/data';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlotWithRentals } from 'src/app/models/plotWithRentals.model';
import { Site } from 'src/app/models/site.model';
import { PageControl } from 'src/app/shared/datagrid/models/pageControl.model';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { SiteModifyShellComponent } from '../../site-modify/site-modify-shell/site-modify-shell.component';
import { PlotWithRentalsEntityService } from '../../../../store/plotWithRentals-entity.service';
import { SiteEntityService } from 'src/app/store/site-entity.service';

@Component({
  selector: 'app-site-display-shell',
  templateUrl: './site-display-shell.component.html',
  styleUrls: ['./site-display-shell.component.scss'],
})
export class SiteDisplayShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  siteId: any;

  site: Site;

  plots: PlotWithRentals[];

  pageControl: PageControl;
  showingModal: boolean;
  modalRef: any;

  constructor(
    private siteEntityService: SiteEntityService,
    private plotWithRentalsEntityService: PlotWithRentalsEntityService,
    private activatedRoute: ActivatedRoute,
    private breadCrumbService: BreadcrumbService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.siteId = params.id;
      this.loadSite();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadSite() {
    let sites$ = this.siteEntityService.store.select((new EntitySelectorsFactory().create<Site>('Site')).selectEntities);

    this.subscriptions.add(
      sites$.pipe(
        map((sites: Site[]) => {
          return sites.find((site: Site) => site.id === this.siteId);
        })
      ).subscribe((site: Site) => {
        if (site != null) {
          this.site = site;
          const b = new Breadcrumb(this.site.name, `/sites/display/${this.site.id}`);
          this.breadCrumbService.add(b);
        }
      })
    );

    this.subscriptions.add(
      this.siteEntityService.getByKey(this.siteId).subscribe((site: Site) => {
        this.site = site;
        const b = new Breadcrumb(site.name, `/sites/display/${this.site.id}`);
        this.breadCrumbService.add(b);
      })
    );

    this.subscriptions.add(
      this.plotWithRentalsEntityService.getWithQuery(this.siteId).subscribe((result: PlotWithRentals[]) => {
        this.plots = result;
      })
    );
  }

  
  openModifyModal(){
    this.showingModal = true;

    this.modalRef = this.modalService.open(SiteModifyShellComponent);
    this.modalRef.componentInstance.site = this.site;
  }

}
