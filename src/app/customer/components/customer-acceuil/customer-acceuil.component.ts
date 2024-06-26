import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/shared/models/product';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-customer-acceuil',
  templateUrl: './customer-acceuil.component.html',
  styleUrls: ['./customer-acceuil.component.scss']
})
export class CustomerAcceuilComponent implements OnInit {

  searchProductsForm! : FormGroup;
  m_listOfproducts : product[] = [];
  categorie: string | null;

  constructor(
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
