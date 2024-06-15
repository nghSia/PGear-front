import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAcceuilComponent } from './components/customer-acceuil/customer-acceuil.component';

const routes: Routes = [
  { path: 'accueil', component: CustomerAcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
