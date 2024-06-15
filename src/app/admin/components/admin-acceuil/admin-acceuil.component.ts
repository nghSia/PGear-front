import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product.modele';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-acceuil',
  templateUrl: './admin-acceuil.component.html',
  styleUrls: ['./admin-acceuil.component.scss']
})
export class AdminAcceuilComponent implements OnInit{
  m_listOfproducts : product[] = [];
  searchProductsForm! : FormGroup;

  constructor(
    private s_adminService : AdminService,
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
    this.s_adminService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    })
  }

  searchProduct(){
    this.m_listOfproducts = [];
    const c_nameProduct = this.searchProductsForm.get('nameProduct')!.value;
    this.s_adminService.getProductsByName(c_nameProduct).subscribe(res =>{
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    })
  }
}
