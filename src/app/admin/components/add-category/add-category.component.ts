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
    private v_formBuilder : FormBuilder,
    private v_router : Router,
    private v_snackbar : MatSnackBar,
    private s_adminService : AdminService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.v_formBuilder.group({
      nomCategory : [null, [Validators.required]],
      descriptionCategory : [null, [Validators.required]]
    })
  }

  onSubmit(): void{
    if(this.categoryForm.valid){
      this.s_adminService.addCategory(this.categoryForm.value).subscribe((res) => {
        if(res.id !=null){
          console.log("res null");
          this.v_snackbar.open('Ajout de categorie terminee', 'Close', {
            duration:5000
          });
          window.location.reload();
          this.v_router.navigateByUrl('/admin/acceuil');
        } else{
          console.log("res non null");
          this.v_snackbar.open(res.message, 'Close', {
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
