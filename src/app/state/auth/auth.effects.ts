import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  logout,
  register,
  registerSuccess,
  registerFailure,
} from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TOKEN } from '../../token';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private usersService: UsersService,
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

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.usersService
          .registerUser({
            name: action.name,
            gender: action.gender,
            email: action.email,
            status: 'active',
          })
          .pipe(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map((user:any) => {
              // Save the user id and password to localStorage
              localStorage.setItem(
                user.email,
                JSON.stringify({ id: user.id, password: action.password }),
              );
              return registerSuccess({ user });
            }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catchError((error:any) => of(registerFailure({ error }))),
          ),
      ),
    );
  });
}
