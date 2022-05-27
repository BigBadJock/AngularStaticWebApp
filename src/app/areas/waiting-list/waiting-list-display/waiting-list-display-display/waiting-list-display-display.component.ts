import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { SiteInterest } from '../../models/SiteInterest.model';

@Component({
  selector: 'app-waiting-list-display-display',
  templateUrl: './waiting-list-display-display.component.html',
  styleUrls: ['./waiting-list-display-display.component.scss']
})
export class WaitingListDisplayDisplayComponent implements OnInit {

  @Input() entry: WaitingList;
  @Input() sites: SiteInterest[];
  @Output() updateClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  update() {
    this.updateClicked.emit(this.entry.id);
  }

}
