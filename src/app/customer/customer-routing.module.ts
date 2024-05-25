import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerAcceuilComponent } from './components/customer-acceuil/customer-acceuil.component';

const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'acceuil', component: CustomerAcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
