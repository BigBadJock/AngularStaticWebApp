import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { WaitingListEntityService } from 'src/app/store/waiting-list-entity.service';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { WaitingListCreateShellComponent } from '../../../waiting-list-create/waiting-list-create-shell/waiting-list-create-shell.component';

@Component({
  selector: 'app-waiting-list-search-shell',
  templateUrl: './waiting-list-search-shell.component.html',
  styleUrls: ['./waiting-list-search-shell.component.scss'],
})
export class WaitingListSearchShellComponent implements OnInit{
  waitingList$: Observable<WaitingList[]>;
  showingModal: boolean;
  modalRef: any;

  constructor(
    private breadCrumbService: BreadcrumbService,
    private waitingListEntityService: WaitingListEntityService,
    private modalService: NgbModal
  ) {
    this.waitingList$ = this.waitingListEntityService.entities$;
    this.breadCrumbService.add(new Breadcrumb('Waiting List', '/waitinglist'));
  }

  ngOnInit(): void {
        this.waitingListEntityService.getWithQuery('$sort_by=created');
  }

  openCreateModal(){
    this.showingModal = true;
    this.modalRef = this.modalService.open(WaitingListCreateShellComponent, { size: 'xl' });
  }



}
