import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../core/contact.model';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  @Output() readonly formData = new EventEmitter<Contact>();

  public form = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  add(): void {
    this.formData.emit(this.form.value);
    this.form.reset();
  }

}
