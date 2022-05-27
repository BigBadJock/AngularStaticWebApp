import {Injectable} from '@angular/core';

@Injectable( { providedIn: 'root' } )
export class LocalStorageService {
  constructor() {}

  setSavedState(localStorageKey: string, state: any) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }

  getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey));
  }
}
