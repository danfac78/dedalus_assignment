import { CommonModule } from '@angular/common';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreFeatureModule, StoreRootModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsState } from './contacts/reducers';

describe('AppComponent', () => {
  const initialState: ContactsState = {
    contacts: [],
    selectedContact: { telephone: 'a', email: 'b', address: 'c', lastname: 'd', firstname: 'e' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render app-contacts', () => {
    const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-contacts')).toBeTruthy();
  });
});
