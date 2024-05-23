import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  v_hidePassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private s_authService : AuthentificationService,
    private snackBar : MatSnackBar,
    private router : Router
  ){
  }

  ngOnInit() : void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.v_hidePassword = !this.v_hidePassword;
  }

  onSubmit() : void {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    console.log("on submit");
    console.log("username  : " + email + "password :" + password);
    this.s_authService.login(email, password).subscribe(
      {
        next : () => {
          this.snackBar.open('Connexion reussie', 'OK', {duration : 5000});
        },
        error : () => {
          this.snackBar.open('Ce compte est introuvable', 'ERROR', {duration : 5000});
        }
      }
    )
  }

}
