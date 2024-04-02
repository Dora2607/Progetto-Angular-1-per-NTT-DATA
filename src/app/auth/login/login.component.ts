import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, logout } from '../../state/auth/auth.actions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LogoComponent } from '../../features/components/logo/logo.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public loginForm !: FormGroup;

  emailTouched = false;
  passwordTouched = false;
  
  
  constructor(
    private formBuilder : FormBuilder, 
    private store: Store) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(login());
      this.loginForm.reset();
    }

  }


  logout(): void {
    this.store.dispatch(logout());
  }
}
