import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plot } from 'src/app/models/plot.model';

@Component({
  selector: 'app-plot-details',
  templateUrl: './plot-details.component.html',
  styleUrls: ['./plot-details.component.scss']
})
export class PlotDetailsComponent implements OnInit {

  @Input() plot: Plot;
  @Output() editClicked = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  
  }

  get isUncultivated() {
    if (this.plot.isUncultivated) {
        return 'Uncultivated'
    }
    return 'Cultivated';
  }
    
  edit() {
    this.editClicked.emit('true');
  }

}
