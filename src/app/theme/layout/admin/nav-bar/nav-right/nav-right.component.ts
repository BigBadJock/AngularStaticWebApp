import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthActions } from 'src/app/auth/store/action-types';
import { User } from 'src/app/models/user.model';
import { getCurrentUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
})
export class NavRightComponent implements OnInit {
  user: User;

  username: string;

  firstName: string;

  lastName: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.pipe(select(getCurrentUser)).subscribe((user: User) => {
      this.user = user;
      this.username = user.userName;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    });
  }

  signOut() {
    this.store.dispatch(AuthActions.SignOut());
  }
}
