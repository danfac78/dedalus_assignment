import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContactActions } from '../actions-types';
import { Contact, Contacts } from '../core/contact.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public contacts!: Contacts | null;
  @Output() public selectedContactIndex = new EventEmitter<number>();

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  viewDetails(e: any): void {
    const tr: HTMLTableRowElement = e.path[1];
    if (tr?.localName !== 'tr' || !tr?.hasAttribute('data-contact')) {
      return;
    }
    const contact = tr.dataset.contact;

    if (contact === null || contact === undefined) {
      return;
    }

    this.store.dispatch(ContactActions.selectFromList({ selectedContact: JSON.parse(contact) }));

    // this.selectedContactIndex.emit(index);
  }

}
