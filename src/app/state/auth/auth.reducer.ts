import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { login, logout } from './auth.actions';
import { TOKEN } from '../../token';

export interface State {
  token: string | null;
}
export const initialState = { token: null };

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
);

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token,
);
