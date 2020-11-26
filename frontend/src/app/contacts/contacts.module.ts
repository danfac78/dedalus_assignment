import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from './contacts.effects';
import { ListComponent } from './list/list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';



@NgModule({
  declarations: [ContactsComponent, ListComponent, AddContactComponent, ContactDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.contactsReducer),
    EffectsModule.forFeature([ContactEffects])
  ],
  exports: [
    ContactsComponent
  ]
})
export class ContactsModule { }
