import { createAction } from '@ngrx/store';


const PREFIX = '[Contacts Container]';
enum Actions {
    load = 'load'
}

export const loadContacts = createAction(
    `${PREFIX} ${Actions.load}`
);
