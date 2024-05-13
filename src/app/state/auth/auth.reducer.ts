import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { login, logout, registerFailure, registerSuccess } from './auth.actions';
import { TOKEN } from '../../token';
import { Users } from '../../models/users.model';

export interface State {
  user: Users | null;
  token: string | null;
}
export const initialState = { user:null, token: null };

export const authReducer = createReducer<State>(
  initialState,
  on(login, (state: State): State => {
    return {
      ...state,
      token: TOKEN,
    };
  }),
  on(logout, (state: State): State => {
    return {
      ...state,
      token: null,
    };
  }),
  on(registerSuccess, (state: State, { user }): State => {
    return {
      ...state,
      user,
    };
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(registerFailure, (state: State, { error }): State => {
    // handle the error
    return state;
  }),
);

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token,
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.token
)