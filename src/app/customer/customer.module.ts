import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerAcceuilComponent } from './components/customer-acceuil/customer-acceuil.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAcceuilComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
