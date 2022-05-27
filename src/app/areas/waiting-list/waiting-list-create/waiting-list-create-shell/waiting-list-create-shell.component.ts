import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Site } from 'src/app/models/site.model';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { SiteEntityService } from 'src/app/store/site-entity.service';
import { WaitingListEntityService } from 'src/app/store/waiting-list-entity.service';
import { SiteInterest } from '../../models/SiteInterest.model';

@Component({
  selector: 'app-waiting-list-create-shell',
  templateUrl: './waiting-list-create-shell.component.html',
  styleUrls: ['./waiting-list-create-shell.component.scss']
})
export class WaitingListCreateShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  sites: SiteInterest[];

  constructor(
    private waitingListEntityService: WaitingListEntityService,
    private siteEntityService: SiteEntityService,
    public activeModal: NgbActiveModal, 
) { }

  ngOnInit(): void {
        this.subscriptions.add(
          this.siteEntityService.getWithQuery('$sort_by=name').pipe(
            map((sites: Site[]) => {
              // insert logic 
              const s: SiteInterest[] = sites.map(site => ({
                siteId: site.id,
                siteName: site.name,
                interested: false
              }));
              return s;
            })
          ).subscribe(data => {
            this.sites = data;
          })
        );    
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

  close() {
    this.activeModal.close();
  }

  formSubmitted(entry: WaitingList) {
    this.waitingListEntityService.add(entry).subscribe(() => {
      this.activeModal.close();
    });
  }


}
