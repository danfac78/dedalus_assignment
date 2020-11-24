import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ContactsModule } from '../contacts.module';
import { Contacts } from './contact.model';

const serializedComparer = (a: Contacts, b: Contacts): boolean => JSON.stringify(a) !== JSON.stringify(b);

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  // for sake of semplicity this is defined as a readnonly,
  // it could be a service that manage reactively the changes to endpoint
  // or a value in the store.
  private readonly ENDPOINT = 'http://localhost:5000/contacts';

  constructor(private http: HttpClient) { }

  public getAllContacts(): Observable<Contacts> {
    return this.http.get<Contacts>(this.ENDPOINT).pipe(
      distinctUntilChanged(serializedComparer)
    );
  }
}
