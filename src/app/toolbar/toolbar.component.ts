import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() drawer: DrawerComponent;
  @HostListener('click')
  click() {
    // TODO: call this will toggle twice, we can test it with number. but I don't know why.
    // this.drawer.toggle();
  }
  constructor() { }

  ngOnInit() {
  }
}
