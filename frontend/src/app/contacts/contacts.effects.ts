import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ContactActions } from './actions-types';
import { ContactsService } from './core/contacts.service';
import { EMPTY } from 'rxjs';


@Injectable()
export class ContactEffects {
    constructor(private contactsService: ContactsService, private actions$: Actions) { }

    public readonly contacts$ = createEffect(
        () => this.actions$.pipe(
            ofType(ContactActions.loadContacts),
            mergeMap(
                () => this.contactsService.getAllContacts().pipe(
                    map(contacts => ContactActions.loadedContacts({ contacts })),
                    catchError(() => EMPTY)
                )
            )
        ),
        { dispatch: true }
    );
}
