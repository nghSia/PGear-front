import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { category } from '../../models/category.modele';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm! : FormGroup;
  listOfcategories: category[] = [];
  selectedFile : File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private m_snackBar : MatSnackBar,
    private s_adminService : AdminService
  ){}

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const c_reader = new FileReader();
    c_reader.onload = () => {
      this.imagePreview = c_reader.result;
    }
    c_reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
        categoryId: [null, [Validators.required]],
        name: [null, [Validators.required]],
        price: [null, [Validators.required]],
        description: [null, [Validators.required]],
      })

      this.getAllCategories();
  }

  getAllCategories(){
    this.s_adminService.getAllCategories().subscribe(res =>{
      this.listOfcategories = res;
    })
  }

  addProduct(): void{
    if(this.productForm.valid){
      const c_formData : FormData = new FormData();
      c_formData.append('imgM', this.selectedFile);
      c_formData.append('categoryId', this.productForm.get('categoryId').value);
      c_formData.append('nomProduit', this.productForm.get('name').value);
      c_formData.append('descriptionProduit', this.productForm.get('description').value);
      c_formData.append('prix', this.productForm.get('price').value);

      this.s_adminService.addProduct(c_formData).subscribe({
        next: (res: any) => {
          if (res.id != null) {
            console.log("res non null");
            this.m_snackBar.open('Produit a bien été créé', 'Fermer', {
              duration: 5000
            });
            this.router.navigateByUrl('/admin/accueil');
          }
        },
        error: (error: any) => {
          this.m_snackBar.open(error.message, 'Erreur', {
            duration: 5000
          });
        }
      })
    } else {
      console.log("form invalid");
      this.productForm.markAllAsTouched();
    }
  }

}
