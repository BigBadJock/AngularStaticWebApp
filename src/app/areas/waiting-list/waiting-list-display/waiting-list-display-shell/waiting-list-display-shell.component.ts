import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Site } from 'src/app/models/site.model';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { SiteEntityService } from 'src/app/store/site-entity.service';
import { WaitingListEntityService } from 'src/app/store/waiting-list-entity.service';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { SiteInterest } from '../../models/SiteInterest.model';
import { WaitingListUpdateShellComponent } from '../../waiting-list-update/waiting-list-update-shell/waiting-list-update-shell.component';

@Component({
  selector: 'app-waiting-list-display-shell',
  templateUrl: './waiting-list-display-shell.component.html',
  styleUrls: ['./waiting-list-display-shell.component.scss']
})
export class WaitingListDisplayShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  entryId: string;
  entry: WaitingList;
  sites: SiteInterest[];
  showingModal: boolean;
  modalRef: any;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private waitingListEntityService: WaitingListEntityService,
    private siteEntityService: SiteEntityService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.entryId = params.id;
      this.loadEntry();
    });
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

  loadEntry(): void {
    this.subscriptions.add(
      this.waitingListEntityService.getByKey(this.entryId).subscribe((entry: WaitingList) => {
        this.entry = entry;
        const b = new Breadcrumb(`Waiting List - ${this.entry.firstName} ${this.entry.lastName}`, `/waitinglist/display/${this.entry.id}`);
        this.breadCrumbService.add(b);


        this.subscriptions.add(
          this.siteEntityService.getWithQuery('$sort_by=name').pipe(
            map((sites: Site[]) => {
              // insert logic 
              const s: SiteInterest[] = sites.map(site => ({
                siteId: site.id,
                siteName: site.name,
                interested: this.checkIfInterested(site.id, this.entry.sites)
              }));
              return s;
            })
          ).subscribe(data => {
            this.sites = data;
          })
        );

      })
    );
    
  }

  checkIfInterested(siteId: string, sites: string): boolean{
    let interested =  sites?.toUpperCase().indexOf(siteId.toUpperCase()) > -1;
    return interested;
  }

  openUpdateModal(id: string){
    this.showingModal = true;
    this.modalRef = this.modalService.open(WaitingListUpdateShellComponent, { size: 'xl' });
    this.modalRef.componentInstance.entry = this.entry;
  }

}
