import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TOKEN } from '../../token';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}


  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(login),
        tap(() => {
          localStorage.setItem('token', TOKEN);
          this.router.navigate(['home']);
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }),
      );
    },
    { dispatch: false },
  );
}
