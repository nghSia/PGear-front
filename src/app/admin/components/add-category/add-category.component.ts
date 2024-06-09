import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
  categoryForm! : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private m_snackbar : MatSnackBar,
    private s_adminService : AdminService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      nomCategory : [null, [Validators.required]],
      descriptionCategory : [null, [Validators.required]]
    })
  }

  onSubmit(): void{
    if(this.categoryForm.valid){
      this.s_adminService.addCategory(this.categoryForm.value).subscribe({
        next: (res: any) => {
          if(res.id !=null){
            console.log("res null");
            this.m_snackbar.open('Ajout de categorie terminee', 'Fermer', {
              duration:5000
            });
            this.router.navigateByUrl('/admin/accueil');
          }
        },
        error: (error: any) => {
          this.m_snackbar.open(error.message, 'Fermer', {
            duration:5000,
            panelClass: 'error-snackbar'
          });
        }
      })
    } else {
      console.log("form invalid");
      this.categoryForm.markAllAsTouched();
    }
  }

}
