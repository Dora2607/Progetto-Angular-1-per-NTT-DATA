import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, logout, register } from '../../state/auth/auth.actions';
import { LogoService } from '../../services/logo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public signupForm!: FormGroup;

  emailTouched = false;
  passwordTouched = false;
  isChecked: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private logoService: LogoService,
  ) {
    this.logoService.isToolbar = false;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });


  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        }),
      );
      // this.loginForm.reset();
      this.router.navigate(['home']);
    }
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.store.dispatch(
        register({
          name: this.signupForm.value.name,
          gender: this.signupForm.value.gender,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        }),
      );
      // this.signupForm.reset();
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }

  toggleCheck() {
    this.isChecked = !this.isChecked;
  }
}
