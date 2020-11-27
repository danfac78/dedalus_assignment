import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContactActions } from '../actions-types';
import { Contact, Contacts, IContact } from '../core/contact.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public contacts!: Contacts | null;

  public previousIndex: number | null = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  viewDetails(e: any): void {
    const tr: HTMLTableRowElement = e.path[1];
    if (tr?.localName !== 'tr' || !tr?.hasAttribute('data-contact')) {
      return;
    }
    const contact = tr.dataset.contact;
    const index = Number(tr.dataset.index);

    if (contact === null || contact === undefined) {
      return;
    }

    if (this.previousIndex === index) {
      this.store.dispatch(ContactActions.clearSelected());
      this.previousIndex = null;
    } else {
      this.store.dispatch(ContactActions.selectFromList({ selectedContact: JSON.parse(contact) }));
      this.previousIndex = index;
    }
  }

}
