import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-site-modify-display',
  templateUrl: './site-modify-display.component.html',
  styleUrls: ['./site-modify-display.component.scss']
})
export class SiteModifyDisplayComponent implements OnInit, OnChanges {

  @Input() site: Site;
  @Output() closeClicked = new EventEmitter();
  @Output() formSubmitted = new EventEmitter();

  siteForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });      
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (this.site != null) {
      this.siteForm.get('siteName').setValue(this.site.name);
    }
  }

  close() {
    this.closeClicked.emit('true');
  }

  get siteName() {
    return this.siteForm.get('siteName');
  }

  saveSite(): void{
    this.formSubmitted.emit(this.siteForm.value);
  }

}
