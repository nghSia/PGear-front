import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAcceuilComponent } from './components/admin-acceuil/admin-acceuil.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'acceuil', component: AdminAcceuilComponent },
  { path: 'ajout-categorie', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
