import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { ContactsModule } from '../contacts.module';
import { IContact } from '../core/contact.model';

import { AddContactComponent } from './add-contact.component';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactComponent ],
      imports: [
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
          AppModule,
          ContactsModule
      ],
      providers: [
        { provide: FormBuilder }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setting input value and clicking add', () => {
    it('should emit a Contact', () => {
      // arrange
      component.ngOnInit();
      component.form.controls.firstname.setValue('john');
      component.form.controls.lastname.setValue('johnson');
      component.form.controls.telephone.setValue('1234567890');
      component.form.controls.address.setValue('St. John Street, 12, Johnstown, Pennsylvania');
      component.form.controls.email.setValue('john.johnson@gmail.com');
      component.formData.subscribe(
        (data: IContact) => {
          // assert
          expect(data.firstname).toEqual('john');
          expect(data.lastname).toEqual('johnson');
          expect(data.telephone).toEqual('1234567890');
          expect(data.address).toEqual('St. John Street, 12, Johnstown, Pennsylvania');
          expect(data.email).toEqual('john.johnson@gmail.com');
        }
      );
      fixture.detectChanges();

      // act
      const buttonAdd = fixture.debugElement.query(By.css('button'));
      buttonAdd.triggerEventHandler('click', null);

      // assert
      expect(component.form.controls.firstname.value).toBeNull();
      expect(component.form.controls.lastname.value).toBeNull();
      expect(component.form.controls.telephone.value).toBeNull();
      expect(component.form.controls.address.value).toBeNull();
      expect(component.form.controls.email.value).toBeNull();

    });
  });

  describe('setting NO input value and clicking add', () => {
    it('should emit a Contact', () => {
      // arrange
      component.ngOnInit();
      const alertSpy = spyOn(window, 'alert');
      component.formData.subscribe(
        (data: IContact) => {
          // assert
          fail('no value should be emitted');
        }
      );
      fixture.detectChanges();

      // act
      const buttonAdd = fixture.debugElement.query(By.css('button'));
      buttonAdd.triggerEventHandler('click', null);

      // assert
      expect(alertSpy.calls.count()).toEqual(1);

    });
  });

  describe('setting input value with a missing field and clicking add', () => {
    it('should emit a Contact', () => {
      // arrange
      component.ngOnInit();
      const alertSpy = spyOn(window, 'alert');
      component.form.controls.firstname.setValue('john');
      component.form.controls.lastname.setValue('johnson');
      // component.form.controls.telephone.setValue('1234567890'); should raise an error
      component.form.controls.address.setValue('St. John Street, 12, Johnstown, Pennsylvania');
      component.form.controls.email.setValue('john.johnson@gmail.com');
      component.formData.subscribe(
        (data: IContact) => {
          // assert
          fail('no value should be emitted');
        }
      );
      fixture.detectChanges();

      // act
      const buttonAdd = fixture.debugElement.query(By.css('button'));
      buttonAdd.triggerEventHandler('click', null);

      // assert
      expect(alertSpy.calls.count()).toEqual(1);
      expect(component.form.controls.firstname.value).toEqual('john');
      expect(component.form.controls.lastname.value).toEqual('johnson');
      expect(component.form.controls.telephone.value).toEqual('');
      expect(component.form.controls.address.value).toEqual('St. John Street, 12, Johnstown, Pennsylvania');
      expect(component.form.controls.email.value).toEqual('john.johnson@gmail.com');

    });
  });
});
