import { createAction, props } from '@ngrx/store';
import { Contact, Contacts } from './core/contact.model';


const getNameWrapper = (prefix: string) => (name: string) => `${prefix} ${name}`;
const getContactsName = getNameWrapper('[Contacts Container]');
const getAddFormName = getNameWrapper('[Add Form]');

enum Actions {
    load = 'load',
    loaded = 'loaded',
    addToList = 'add contact to store',
    updateList = 'refresh contact list'
}

export const loadContacts = createAction(
   getContactsName(Actions.load)
);

export const loadedContacts = createAction(
    getContactsName(Actions.loaded),
    props<{ contacts: Contacts }>()
);

export const addContactToList = createAction(
    getContactsName(Actions.addToList),
    props<{ contactToAdd: Contact }>()
);

export const refreshListContent = createAction(
    getAddFormName(Actions.updateList)
);
