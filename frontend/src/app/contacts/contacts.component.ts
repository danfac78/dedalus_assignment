import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppState } from '../reducers';
import { ContactActions } from './actions-types';
import { selectedContact, storedContacts } from './contacts.selectors';
import { Contact, Contacts, IContact } from './core/contact.model';

@Component({
  selector: 'app-contacts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public contacts$!: Observable<Contacts>;
  public selectedContact$!: Observable<IContact | null>;

  ngOnInit(): void {
    this.store.dispatch(ContactActions.loadContacts());
    this.contacts$ = this.store.select(storedContacts);
    this.selectedContact$ = this.store.select(selectedContact);
  }

  addContactToList(contact: Contact): void {
    this.store.dispatch(ContactActions.addContactToList({ contactToAdd: contact }));
  }
}
