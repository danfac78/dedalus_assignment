import { Component, Input, OnInit } from '@angular/core';
import { Contacts } from '../core/contact.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() public contacts!: Contacts | null;

  constructor() { }

  ngOnInit(): void {
  }

}
