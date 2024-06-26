import { Component, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { MatDialog } from '@angular/material/dialog';
import { PoliticComponent } from '../shared/components/politic/politic.component';
import { DomSanitizer } from '@angular/platform-browser';

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
    private m_dialog : MatDialog,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]],
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
  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const c_value: string = control.value;
    if (c_value == null) {
      return null;
    }
    const c_hasMinimumLength: boolean = c_value.length >= 5;
    const c_isNotNumericOnly: boolean = !/^\d+$/.test(c_value);

    const usernameValid: boolean = c_hasMinimumLength && c_isNotNumericOnly;
    return !usernameValid ? { usernameInvalid: true } : null;
  }

  OnSubmit() : void{
      const password : string = this.signupForm.get('password')?.value;
      const confirmpassword : string = this.signupForm.get('confirmpassword')?.value;

      if(password !== confirmpassword){
        this.snackbar.open('Les mots de passes ne correspondent pas', 'Fermer', {duration : 5000, panelClass: 'error-snackbar'});
        return;
      }

      const c_sanitizedForm = {
        username: this.sanitize(this.signupForm.get('username')?.value, SecurityContext.SCRIPT),
        email: this.sanitize(this.signupForm.get('email')?.value, SecurityContext.SCRIPT),
        password: this.sanitize(this.signupForm.get('password')?.value, SecurityContext.SCRIPT),
        confirmpassword: this.sanitize(this.signupForm.get('confirmpassword')?.value, SecurityContext.SCRIPT),
        acceptTerms: this.signupForm.get('acceptTerms')?.value
      };

      this.s_authService.register(c_sanitizedForm).subscribe(
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


  private sanitize(value: string, p_context: SecurityContext): string {
    return this.sanitizer.sanitize(p_context, value) || '';
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
