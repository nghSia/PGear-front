import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-card/product-list.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoliticComponent } from './components/politic/politic.component';



@NgModule({
  declarations: [
    ProductListComponent,
    PoliticComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ProductListComponent,
    PoliticComponent
  ]
})
export class SharedModule { }
