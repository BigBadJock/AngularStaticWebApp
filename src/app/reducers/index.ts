/* eslint-disable no-console */
import { ActionReducer, ActionReducerMap, INIT, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { AuthActions } from '../auth/store/action-types';
import { AuthActionTypes } from '../auth/store/auth.actions';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export function signout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if ( action != null && action.type === AuthActionTypes.UserSignOut) {
      return reducer( undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger,signout] : [signout];
