import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { ContactsState } from './reducers';


export const selectContactsState = createFeatureSelector<ContactsState>('contacts');

export const storedContacts = createSelector(
    selectContactsState,
    contacts => contacts.contacts
);
