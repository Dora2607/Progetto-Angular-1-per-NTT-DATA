import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  login,
  register,
  registerSuccess,
} from '../../state/auth/auth.actions';
import { LogoService } from '../../services/logo.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public signupForm!: FormGroup;

  isChecked: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private logoService: LogoService,
    private actions$: Actions,
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

    this.actions$
      .pipe(ofType(registerSuccess), takeUntil(this.destroy$))
      .subscribe(() => {
        this.toggleCheck();
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
    }
  }

  toggleCheck() {
    this.isChecked = !this.isChecked;
    this.loginForm.reset({ email:'', password:'' });
    this.signupForm.reset({ name: '', gender: '', email: '', password: '' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
