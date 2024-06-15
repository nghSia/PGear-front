import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAcceuilComponent } from './components/admin-acceuil/admin-acceuil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { MaterialModule } from '../material.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminAcceuilComponent,
    AddCategoryComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
