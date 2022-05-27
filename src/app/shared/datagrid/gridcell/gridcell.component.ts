import { Component, Input, OnInit } from '@angular/core';
import { ColumnDefinition } from '../models/column-definition.model';

@Component({
  selector: 'app-gridcell',
  templateUrl: './gridcell.component.html',
  styleUrls: ['./gridcell.component.scss'],
})
export class GridcellComponent implements OnInit {
  @Input() columnDefinition: ColumnDefinition;

  @Input() data: any;

  @Input() id: string;
 

  routerLink: string[] = [];

  ngOnInit(): void{
    if (this.columnDefinition.dataType === 'link') {
      this.routerLink = [
        this.columnDefinition.routerLink,
        this.id
      ];
      if (this.columnDefinition.linkData) {
        this.columnDefinition.linkData.forEach(s => {
          this.routerLink.push(s);
        });
      }
    }
  }

  buttonClick() {
    const event = { 'id': this.id };
    this.columnDefinition.buttonEventEmitter.emit(event);
  }
}
