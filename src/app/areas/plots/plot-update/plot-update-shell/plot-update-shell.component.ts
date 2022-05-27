import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Plot } from 'src/app/models/plot.model';
import { PlotEntityService } from 'src/app/store/plot-entity-service';

@Component({
  selector: 'app-plot-update-shell',
  templateUrl: './plot-update-shell.component.html',
  styleUrls: ['./plot-update-shell.component.scss']
})
export class PlotUpdateShellComponent implements OnInit {
  @Input() plot: Plot;
  @Output() reloadEmitter = new EventEmitter();
    
  constructor(public activeModal: NgbActiveModal, private plotEntityService: PlotEntityService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }
  formSubmitted(form: any) {
    let updatedPlot = { ...this.plot };
    updatedPlot.name = form.plotName;
    updatedPlot.size = form.plotSize;

    this.plotEntityService.update(updatedPlot).subscribe((x: Plot) => {
      this.plot = x;
      this.reloadEmitter.emit('true');
      this.activeModal.dismiss();
    });
  }

}
