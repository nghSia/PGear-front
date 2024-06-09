import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { product } from 'src/app/shared/models/product';
import { SharedService } from 'src/app/shared/service/visitor/shared.service';

@Component({
  selector: 'app-visitor-accueil',
  templateUrl: './visitor-accueil.component.html',
  styleUrls: ['./visitor-accueil.component.scss']
})
export class VisitorAccueilComponent {
  m_listOfproducts : product[] = [];
  searchProductsForm! : FormGroup;

  constructor(
    private s_sharedService : SharedService,
    private m_snackBar : MatSnackBar,
    private formBuilder : FormBuilder
    
  ){}

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductsForm = this.formBuilder.group({
      nameProduct: [null, [Validators.required]]
    })
  }

  getAllProducts(){
    this.m_listOfproducts = [];
    this.s_sharedService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    })
  }

  searchProduct(){
    this.m_listOfproducts = [];
    const c_nameProduct = this.searchProductsForm.get('nameProduct')!.value;
    this.s_sharedService.getProductsByName(c_nameProduct).subscribe(res =>{
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    })
  }
}
