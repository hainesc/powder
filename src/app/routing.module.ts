import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GatewayComponent } from './gateway/gateway.component';
import { BindingComponent } from './binding/binding.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'binding',
    pathMatch: 'full'
  },
  {
    path: 'binding',
    component: BindingComponent
  },
  {
    path: 'gateway',
    component: GatewayComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
