import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GatewayComponent } from './gateway/gateway.component';
import { BindingComponent } from './binding/binding.component';
import { AllocateComponent } from './allocate/allocate.component';
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
    path: 'allocate',
    component: AllocateComponent
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
