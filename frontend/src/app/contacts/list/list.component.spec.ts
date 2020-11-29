import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { AppState } from 'src/app/reducers';
import { selectContactsState } from '../contacts.selectors';

import { Contact, IContact } from '../core/contact.model';
import { contactsReducer, ContactsState } from '../reducers';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: Store<AppState>;

  type SELECTED_CONTACT_SHORTCUT = { contacts: { selectedContact: Contact } };

  const initialState: ContactsState = {
    contacts: [],
    selectedContact: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
      imports: [StoreModule.forRoot({ contacts: contactsReducer })],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const expetationChecker = (e: Contact) => (c: AppState): void => {
    expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.firstname).toEqual(e.firstname);
    expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.lastname).toEqual(e.lastname);
    expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.telephone).toEqual(e.telephone);
    expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.address).toEqual(e.address);
    expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.email).toEqual(e.email);
  };

  const CONTACTS_DATA: Contact[] = [
    new Contact({
      firstname: 'john',
      lastname: 'johnson',
      telephone: '1234567890',
      address: 'St. John Street, 12, Johnstown, Pennsylvania',
      email: 'john.johnson@gmail.com'
    }),
    new Contact({
      firstname: 'peter',
      lastname: 'peterson',
      telephone: '2345678901',
      address: 'Peter Avenue Park 13, Johannesburg, Sudafrica',
      email: 'p.peterson@gmail.com'
    })
  ];

  describe('setting input value and clicking on a table data element', () => {
    it('should store a Contact', () => {
      // arrange
      component.ngOnInit();
      component.contacts = CONTACTS_DATA;

      const EXPECTED_CONTACT = CONTACTS_DATA[1];

      fixture.detectChanges();

      // act
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'td');
      clickedTableRows[2].click();

      // assert
      store.subscribe(expetationChecker(EXPECTED_CONTACT));
    });
  });

  describe('setting input value and clicking on an table header', () => {
    it('should not change the contact in the store', () => {
      // arrange
      component.ngOnInit();
      component.contacts = CONTACTS_DATA;

      const EXPECTED_CONTACT = CONTACTS_DATA[1];

      fixture.detectChanges();

      // act
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows: HTMLTableDataCellElement[] = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'tr');
      clickedTableRows[0].click();

      const clickedTable: HTMLTableElement = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'table').pop();
      clickedTable.click();

      // assert
      store.subscribe(expetationChecker(EXPECTED_CONTACT));
    });
  });

  describe('setting input value and clicking on the table element', () => {
    it('should not change the contact in the store', () => {
      // arrange
      component.ngOnInit();
      component.contacts = CONTACTS_DATA;

      const EXPECTED_CONTACT = CONTACTS_DATA[1];

      fixture.detectChanges();

      // act
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows: HTMLTableDataCellElement[] = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'td');
      clickedTableRows[2].click();

      const clickedTable: HTMLTableElement = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'table').pop();
      clickedTable.click();

      // assert
      store.subscribe(expetationChecker(EXPECTED_CONTACT));
    });
  });
});
