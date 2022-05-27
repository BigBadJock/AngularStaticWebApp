import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { WaitingListEntityService } from 'src/app/store/waiting-list-entity.service';

@Component({
  selector: 'app-waiting-list-update-shell',
  templateUrl: './waiting-list-update-shell.component.html',
  styleUrls: ['./waiting-list-update-shell.component.scss']
})
export class WaitingListUpdateShellComponent implements OnInit {
  @Input() entry: WaitingList;
  
  constructor(public activeModal: NgbActiveModal, private waitingListEntityService: WaitingListEntityService ) { }

  ngOnInit(): void {

  }

  closeClicked($event) {
    this.activeModal.close();
  }

  submitClicked(updatedEntry: WaitingList) {
        this.waitingListEntityService.update(updatedEntry).subscribe((x: WaitingList) => {
      this.activeModal.dismiss();
    });
  }

}
