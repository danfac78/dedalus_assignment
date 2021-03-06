import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IContact } from '../core/contact.model';

@Component({
  selector: 'app-contact-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact!: IContact;

  constructor() { }

  ngOnInit(): void {
  }

}
