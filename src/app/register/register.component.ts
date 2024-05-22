import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  signupForm! : FormGroup;
  hidePassword = true;

  constructor(
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : AuthentificationService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.signupForm = this.fb.group({
        username:[null, [Validators.required]],
        email:[null, [Validators.required, Validators.email]],
        password:[null, [Validators.required]],
        confirmpassword:[null, [Validators.required]]
      })

  }

  TogglePassWordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  OnSubmit() : void{
      const password = this.signupForm.get('password')?.value;
      const confirmpassword = this.signupForm.get('confirmpassword')?.value;

      if(password !== confirmpassword){
        this.snackbar.open('Les mots de passes ne correspondent pas', 'Close', {duration : 5000, panelClass: 'error-snackbar'});
        return;
      }

      this.authService.register(this.signupForm.value).subscribe(
        {
          next : (response) => {
            this.snackbar.open('Inscription termine', 'Close', {duration : 5000});
            this.router.navigateByUrl("/login");
          },
          error: (error) => {
            this.snackbar.open('Inscription termine avec erreur', 'Close', {duration : 5000, panelClass: 'error-snackbar'});
          }
        }
      )
  }

}
