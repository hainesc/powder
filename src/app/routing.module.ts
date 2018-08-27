import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GatewayComponent } from './gateway/gateway.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'gateway',
    pathMatch: 'full'
  },
  {
    path: 'gateway',
    component: GatewayComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
