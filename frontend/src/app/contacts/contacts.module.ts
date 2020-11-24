import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { StoreModule } from '@ngrx/store';
import * as fromContacts from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from './contacts.effects';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [ContactsComponent, ListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromContacts.contactsFeatureKey, fromContacts.contactsReducer),
    EffectsModule.forFeature([ContactEffects])
  ],
  exports: [
    ContactsComponent
  ]
})
export class ContactsModule { }
