import { createAction, props } from '@ngrx/store';
import { Contacts } from './core/contact.model';


const PREFIX = '[Contacts Container]';
enum Actions {
    load = 'load',
    loaded = 'loaded'
}

export const loadContacts = createAction(
    `${PREFIX} ${Actions.load}`
);

export const loadedContacts = createAction(
    `${PREFIX} ${Actions.loaded}`,
    props<{ contacts: Contacts }>()
);
