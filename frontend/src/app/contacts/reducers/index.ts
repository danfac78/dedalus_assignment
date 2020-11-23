import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';

import { ContactActions } from '../actions-types';
import { Contacts } from '../core/contact.model';


export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: Contacts;
}

export const initialContactsState: ContactsState = {
  contacts: []
};

export const contactsReducer = createReducer(
  initialContactsState,
  on(
    ContactActions.loadContacts,
    (state: ContactsState, action) => ({
      contacts: [{
        address: 'bau',
        email: 'miao',
        firstName: 'chirp',
        lastName: 'mouuu',
        phone: 'snort'
      }]
    })
  )
);
