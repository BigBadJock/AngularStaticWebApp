import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-create-display',
  templateUrl: './site-create-display.component.html',
  styleUrls: ['./site-create-display.component.scss']
})
export class SiteCreateDisplayComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();
  
  siteForm: FormGroup;

  
  constructor(private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      noOfPlots:['', [Validators.required, Validators.min(1), Validators.max(250)]]
    });
  }

  ngOnInit(): void {  }

  get siteName() {
    return this.siteForm.get('siteName');
  }

  get noOfPlots() {
    return this.siteForm.get('noOfPlots');
  }

  saveSite(): void{
    this.formSubmitted.emit(this.siteForm.value);
  }

  cancel(): void{
    this.cancelClicked.emit('true');
  }


}
