import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaitingList } from 'src/app/models/waiting-list.model';
import { SiteInterest } from '../../models/SiteInterest.model';

@Component({
  selector: 'app-waiting-list-create-display',
  templateUrl: './waiting-list-create-display.component.html',
  styleUrls: ['./waiting-list-create-display.component.scss']
})
export class WaitingListCreateDisplayComponent implements OnInit, OnChanges {
  @Input() sites: SiteInterest[];

  @Output() closeClicked = new EventEmitter();
  @Output() formSubmitted = new EventEmitter();
  

  form: FormGroup;
  siteList: FormArray;

  constructor(private fb: FormBuilder) {
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      addressLine1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      addressLine2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      addressLine3: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      addressLine4: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      postCode: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],
      email: ['email', [Validators.required, Validators.email]],
      allSites: this.fb.array([this.createSite('', '', true)])
    });
    this.siteList = this.form.get('allSites') as FormArray;
  }

  ngOnChanges(): void{
    if (this.sites) {
      this.siteList.clear();
      this.sites.forEach((site: SiteInterest) => {
        this.siteList.push(this.createSite(site.siteId, site.siteName, site.interested));
      });


      this.form.patchValue(
        {
          allSites: this.sites
        }
      );
    }
  }

  close() {
    this.closeClicked.emit('true');
  }

  submit() {
    let entry = new WaitingList();
    entry.title = this.title.value;
    entry.firstName = this.firstName.value;
    entry.lastName = this.lastName.value;
    entry.phone = this.phone.value;
    entry.email = this.email.value;
    entry.addressLine1 = this.addressLine1.value;
    entry.addressLine2 = this.addressLine2.value;
    entry.addressLine3 = this.addressLine3.value;
    entry.addressLine4 = this.addressLine4.value;
    entry.postCode = this.postCode.value;

    entry.sites = '';
    for (let i = 0; i < this.siteList.length; i++){
      const formGroup = this.siteList.controls[i] as FormGroup;
      if (formGroup.controls['interested'].value) {
        entry.sites += formGroup.controls['siteId'].value + ',';
      };
    }

    this.formSubmitted.emit(entry);
  }

  createSite(siteId: string, siteName: string, interested: boolean): FormGroup{
    return this.fb.group({
      siteId: [null],
      siteName: [null],
      interested:[null],
    });
  }

  
  get title() {
    return this.form.get('title');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }
  
  get addressLine1() {
    return this.form.get('addressLine1');
  }
  
  get addressLine2() {
    return this.form.get('addressLine2');
  }
  
  get addressLine3() {
    return this.form.get('addressLine3');
  }
  
  get addressLine4() {
    return this.form.get('addressLine4');
  }
  
  get postCode() {
    return this.form.get('postCode');
  }
  
  get phone() {
    return this.form.get('phone');
  }
  
  get email() {
    return this.form.get('email');
  }
    
  get siteFormGroup() {
    return this.form.get('allSites') as FormArray;
  }


}
