import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { PoliticComponent } from '../shared/components/politic/politic.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  signupForm! : FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder : FormBuilder,
    private snackbar : MatSnackBar,
    private s_authService : AuthentificationService,
    private router: Router,
    private m_dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, this.passwordValidator!]],
      confirmpassword:[null, [Validators.required]],
      acceptTerms:[null,[Validators.requiredTrue]]
    })
  }

  TogglePassWordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null{
    const c_value : string = control.value;
    if(c_value == null){
      return null;
    }
    const c_hasMinimumLength : boolean = c_value.length >= 12;
    const c_hasSpecialCharacter : boolean = /[!@#$%^&*(),.?":{}|<>]/.test(c_value);
    const c_hasNumber : boolean = /\d/.test(c_value);

    const passwordValid : boolean = c_hasMinimumLength && c_hasSpecialCharacter && c_hasNumber;
    return !passwordValid ? { passwordStrength: true } : null;
  }

  OnSubmit() : void{
      const password : string = this.signupForm.get('password')?.value;
      const confirmpassword : string = this.signupForm.get('confirmpassword')?.value;

      if(password !== confirmpassword){
        this.snackbar.open('Les mots de passes ne correspondent pas', 'Fermer', {duration : 5000, panelClass: 'error-snackbar'});
        return;
      }

      this.s_authService.register(this.signupForm.value).subscribe(
        {
          next : () => {
            this.snackbar.open('Inscription termine', 'Fermer', {duration : 5000});
            this.router.navigateByUrl("/login");
          },
          error: () => {
            this.snackbar.open('Inscription termine avec erreur', 'Fermer', {duration : 5000, panelClass: 'error-snackbar'});
          }
        }
      )
  }

  openDialog(){
    const c_dialogRef = this.m_dialog.open(PoliticComponent, {
      width: '80%',
      height: '80%'
    });

    c_dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
