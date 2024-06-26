import { Component, Input, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CustomerService } from 'src/app/customer/service/customer.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: product[] = [];
  @Input() isAdmin: boolean = false;
  @Input() isCustomer: boolean = false;
  @Input() refreshProductsCallback: () => void;

  constructor(
    private s_adminService : AdminService,
    private s_customerService: CustomerService,
    private m_snackBar : MatSnackBar,
  ){}

  deleteProduct(p_productId:any){
    this.s_adminService.deleteProduct(p_productId).subscribe({
      next: () => {
        this.m_snackBar.open('produit a bien ete supprime', 'Fermer'), {
          duration: 5000
        }
        this.refreshProductsCallback();
      },
      error: (error: any) => {
        this.m_snackBar.open(error.message, 'Fermer'), {
          duration: 5000,
          panelClass: 'error-snackbar'
        }
      }
    })
  }

  addToCart(p_productId : any){
    this.s_customerService.addToCart(p_productId).subscribe({
      next:(res) =>{
        console.log("next" + res);
        this.m_snackBar.open('Ajoute au panier', 'Fermer'), {
          duration: 5000,
        }
      },
      error: (error) => {
        console.log("err" + error);
      }
    })
  }

  reload() : void{
    window.location.reload();
  }
}
