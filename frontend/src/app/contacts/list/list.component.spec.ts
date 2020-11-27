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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setting input value and clicking on a "td" element', () => {
    it('should store a Contact', () => {
      // arrange
      component.ngOnInit();
      component.contacts = [
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

      const EXPECTED_CONTACT = component.contacts[1];

      fixture.detectChanges();

      // act
      const store: Store<AppState> = TestBed.inject(Store);
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'td');
      clickedTableRows[2].click();

      // assert
      store.subscribe(c => {
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.firstname).toEqual(EXPECTED_CONTACT.firstname);
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.lastname).toEqual(EXPECTED_CONTACT.lastname);
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.telephone).toEqual(EXPECTED_CONTACT.telephone);
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.address).toEqual(EXPECTED_CONTACT.address);
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact.email).toEqual(EXPECTED_CONTACT.email);
      });
    });
  });

  describe('setting input value and clicking on an table header', () => {
    it('should store a Contact', () => {
      // arrange
      component.ngOnInit();
      component.contacts = [
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

      fixture.detectChanges();

      // act
      const store: Store<AppState> = TestBed.inject(Store);
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'tr');
      clickedTableRows[0].click();

      // assert
      store.subscribe(c => {
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact).toBeNull();
      });
    });
  });

  describe('setting input value and clicking on the table element', () => {
    it('should store a Contact', () => {
      // arrange
      component.ngOnInit();
      component.contacts = [
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

      fixture.detectChanges();

      // act
      const store: Store<AppState> = TestBed.inject(Store);
      const contactsTableFlat = fixture.debugElement.queryAllNodes(By.all());
      const clickedTableRows = contactsTableFlat.map(n => n.nativeNode).filter(n => n.localName === 'table');
      clickedTableRows[0].click();

      // assert
      store.subscribe(c => {
        expect((c as SELECTED_CONTACT_SHORTCUT).contacts.selectedContact).toBeNull();
      });
    });
  });
});
