import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAcceuilComponent } from './components/admin-acceuil/admin-acceuil.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'accueil', component: AdminAcceuilComponent },
  { path: 'ajout-categorie', component: AddCategoryComponent },
  { path: 'ajout-produit', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
