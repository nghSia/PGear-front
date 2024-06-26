import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/composant/home/home.component';
import { CustomerAcceuilComponent } from './customer/components/customer-acceuil/customer-acceuil.component';
import { AdminAcceuilComponent } from './admin/components/admin-acceuil/admin-acceuil.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'home/categorie', loadChildren: () => import('./home/home.module').then(m => m.VisitorModule) },
  { path: 'admin/categorie', component: AdminAcceuilComponent },
  { path: 'customer/categorie', component: CustomerAcceuilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
