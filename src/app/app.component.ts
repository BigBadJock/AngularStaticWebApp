import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { SignInSuccess } from './auth/store/auth.actions';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Allotment-FrontEnd';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const userValue = localStorage.getItem('user');

    if (userValue) {
      const user: User = JSON.parse(userValue);
      this.store.dispatch(SignInSuccess({ user }));
    }
  }
}
