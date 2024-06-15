import { Component, Input, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';

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
  @Input() refreshByCategorie: () => void;

  constructor(
    private s_adminService : AdminService,
    private m_snackBar : MatSnackBar,
  ){}

  deleteProduct(p_productId:any){
    this.s_adminService.deleteProduct(p_productId).subscribe({
      next: (res: any) => {
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

  reload() : void{
    window.location.reload();
  }
}
