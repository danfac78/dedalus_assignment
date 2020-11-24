import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../reducers';
import { ContactActions } from './actions-types';
import { storedContacts } from './contacts.selectors';
import { Contacts } from './core/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public contacts$!: Observable<Contacts>;

  ngOnInit(): void {
    this.store.dispatch(ContactActions.loadContacts());
    this.contacts$ = this.store.select(storedContacts);
  }

}
