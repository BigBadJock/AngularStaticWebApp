import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Plot } from 'src/app/models/plot.model';

@Component({
  selector: 'app-plot-update-display',
  templateUrl: './plot-update-display.component.html',
  styleUrls: ['./plot-update-display.component.scss']
})
export class PlotUpdateDisplayComponent implements OnInit {
  @Input() plot: Plot;

  @Output() closeClicked = new EventEmitter();
  @Output() formSubmitted = new EventEmitter();
  
  plotForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.plotForm = this.fb.group({
      plotName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      plotSize: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.plotForm.setValue({
      plotName: this.plot.name,
      plotSize: this.plot.size
    })
  }

  
  get plotName() {
    return this.plotForm.get('plotName');
  }

    get plotSize() {
    return this.plotForm.get('plotSize');
  }

  save() {
    this.formSubmitted.emit(this.plotForm.value);
  }
  
  close() {
    this.closeClicked.emit('true');
  }
}
