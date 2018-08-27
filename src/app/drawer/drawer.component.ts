import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {
  public opened: boolean;

  constructor(
  ) { }

  ngOnInit() {
    this.opened = true;
  }
  toggle() {
    this.opened = !this.opened;
  }
}
