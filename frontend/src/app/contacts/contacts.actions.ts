import { createAction, props } from '@ngrx/store';
import { Contact, Contacts } from './core/contact.model';


const getNameWrapper = (prefix: string) => (name: string) => `${prefix} ${name}`;

const nameGetters = {
    getContactsName: getNameWrapper('[Contacts Container]'),
    getAddFormName: getNameWrapper('[Add Form]'),
    getContactListName: getNameWrapper('[Contact List]')
};

enum Actions {
    load = 'load',
    loaded = 'loaded',
    addToList = 'add contact to store',
    updateList = 'refresh contact list',
    selectFromList = 'select the contact from the list'
}

export const loadContacts = createAction(
    nameGetters.getContactsName(Actions.load)
);

export const loadedContacts = createAction(
    nameGetters.getContactsName(Actions.loaded),
    props<{ contacts: Contacts }>()
);

export const addContactToList = createAction(
    nameGetters.getContactsName(Actions.addToList),
    props<{ contactToAdd: Contact }>()
);

export const refreshListContent = createAction(
    nameGetters.getAddFormName(Actions.updateList)
);

export const selectFromList = createAction(
    nameGetters.getContactListName(Actions.selectFromList),
    props<{ selectedContact: Contact }>()
);
