import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, logout } from '../../state/auth/auth.actions';
import { LogoService } from '../../services/logo.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public loginForm !: FormGroup;
  public signupForm!: FormGroup;

  emailTouched = false;
  passwordTouched = false;
  isChecked: boolean = false;
  
  
  constructor(
    private formBuilder : FormBuilder, 
    private store: Store,
    private logoService:LogoService) {
      this.logoService.isToolbar = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], 
    })
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })

  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(login());
      // this.loginForm.reset();
    }

  }

  signup(): void {
    console.log('ciao')
  }


  logout(): void {
    this.store.dispatch(logout());
  }

  toggleCheck() {
    this.isChecked = !this.isChecked;
  }
}
