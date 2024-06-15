import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisitorAccueilComponent } from './visitor/composant/visitor-accueil/visitor-accueil.component';
import { ProductListComponent } from './shared/components/product-card/product-list.component';


const routes: Routes = [
  { path: '', component: VisitorAccueilComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'visitor', loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
