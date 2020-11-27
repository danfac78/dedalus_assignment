import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { IContact } from '../core/contact.model';

import { ContactDetailComponent } from './contact-detail.component';

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  describe('passing in a dummy contact', () => {
    const DUMMY_CONTACT = { firstname: 'a', lastname: 'b', address: 'c', email: 'd', telephone: 'e' };

    beforeEach(() => {
      fixture = TestBed.createComponent(ContactDetailComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      component.contact = DUMMY_CONTACT;
      expect(component).toBeTruthy();
    });
  });

  describe('passing in a null contact', () => {
    const DUMMY_CONTACT = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(ContactDetailComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      component.contact = (DUMMY_CONTACT as unknown) as IContact;
      expect(component).toBeTruthy();
    });
  });

});
