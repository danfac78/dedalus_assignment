import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from './reducers';



@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.reducers)
  ],
  exports: [
    ContactsComponent
  ]
})
export class ContactsModule { }
