import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product.modele';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-admin-acceuil',
  templateUrl: './admin-acceuil.component.html',
  styleUrls: ['./admin-acceuil.component.scss']
})
export class AdminAcceuilComponent implements OnInit{
  m_listOfproducts : product[] = [];
  searchProductsForm! : FormGroup;
  categorie: string | null;

  constructor(
    private s_adminService : AdminService,
    private s_sharedService : SharedService,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute
    
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorie = params.get('categorie');
      if (this.categorie) {
        this.getProductsByCategory(this.categorie);
      } else {
        this.getAllProducts();
      }
    });

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
  
  getProductsByCategory(p_nameCategory: string) {
    this.m_listOfproducts = [];
    this.s_sharedService.getProductsByCategory(p_nameCategory).subscribe(res => {
      res.forEach(element => {
        element.imgProduit = 'data:image/jpeg;base64,' + element.imgProduit;
        this.m_listOfproducts.push(element);
      });
    });
  }
}
