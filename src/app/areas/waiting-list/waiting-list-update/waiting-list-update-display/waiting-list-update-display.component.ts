import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WaitingList } from 'src/app/models/waiting-list.model';

@Component({
  selector: 'app-waiting-list-update-display',
  templateUrl: './waiting-list-update-display.component.html',
  styleUrls: ['./waiting-list-update-display.component.scss']
})
export class WaitingListUpdateDisplayComponent implements OnInit {
  @Input() entry: WaitingList;
  @Output() closeClick = new EventEmitter();
  @Output() submitClick = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    });

    this.form.setValue({
      title: this.entry.title,
      firstName: this.entry.firstName,
      lastName: this.entry.lastName,
      addressLine1: this.entry.addressLine1,
      addressLine2: this.entry.addressLine2,
      addressLine3: this.entry.addressLine3,
      addressLine4: this.entry.addressLine4,
      postCode: this.entry.postCode,
      phone: this.entry.phone,
      email: this.entry.email
    })
  }

  submit() {
    let updatedEntry = {... this.entry};

    updatedEntry.title = this.title.value;
    updatedEntry.firstName = this.firstName.value;
    updatedEntry.lastName = this.lastName.value;
    updatedEntry.phone = this.phone.value;
    updatedEntry.email = this.email.value;
    updatedEntry.addressLine1 = this.addressLine1.value;
    updatedEntry.addressLine2 = this.addressLine2.value;
    updatedEntry.addressLine3 = this.addressLine3.value;
    updatedEntry.addressLine4 = this.addressLine4.value;
    updatedEntry.postCode = this.postCode.value;

    this.submitClick.emit(updatedEntry);
  }

  close() {
    this.closeClick.emit('true');
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

}
