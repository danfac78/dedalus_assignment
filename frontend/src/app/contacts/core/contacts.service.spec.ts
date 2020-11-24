import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactsService } from './contacts.service';
import { Contacts } from './contact.model';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContactsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllContacts method', () => {
    it('it should return an empty array', () => {
      // arrange
      const EXPECTED_RESULT: Contacts = [];

      // act
      const retData = service.getAllContacts();

      // assert
      retData.subscribe(data => {
        expect(data).toEqual(EXPECTED_RESULT);
      });

      const req = httpTestingController.expectOne('http://localhost:5000/contacts');
      expect(req.request.method).toEqual('GET');
      req.flush(EXPECTED_RESULT);
    });
  });
});
