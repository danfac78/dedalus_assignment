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
import { Contact, Contacts, IContact } from '../core/contact.model';

const pushToArray = (array: any[], item: any) => (array.push(item), array);
export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: Contacts;
  selectedContact: IContact | null;
}

export const initialContactsState: ContactsState = {
  contacts: [],
  selectedContact: null
};

export const contactsReducer = createReducer(
  initialContactsState,
  on(
    ContactActions.loadedContacts,
    (state: ContactsState, action) => ({
      ...state,
      contacts: action.contacts
    })
  ),
  on(
    ContactActions.addContactToList,
    (state: ContactsState, action) => ({
      ...state,
      contacts: pushToArray([...state.contacts], new Contact(action.contactToAdd))
    })
  ),
  on(
    ContactActions.selectFromList,
    (state: ContactsState, action) => ({
      ...state,
      selectedContact: action.selectedContact
    })
  ),
  on(
    ContactActions.clearSelected,
    (state: ContactsState, action) => ({
      ...state,
      selectedContact: null
    })
  )
);
