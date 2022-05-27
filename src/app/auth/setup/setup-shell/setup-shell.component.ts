import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateOrganisationDTO } from 'src/app/models/createOrganisation.dto';
import { User } from 'src/app/models/user.model';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { RefreshTokenCredentials } from '../../models/refreshTokenCredentials.model';
import { AuthActions } from '../../store/action-types';
import { AuthState } from '../../store/auth.reducers';
import { getCurrentUser, isSetupComplete, isTokenRefreshed } from '../../store/auth.selectors';

@Component({
  selector: 'app-setup-shell',
  templateUrl: './setup-shell.component.html',
  styleUrls: ['./setup-shell.component.scss'],
})
export class SetupShellComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  refreshTokenCredentials: RefreshTokenCredentials;

  constructor(
    private authStore: Store<AuthState>,
    private breadCrumbService: BreadcrumbService,
    private router: Router,
  ) {
    this.breadCrumbService.add(new Breadcrumb('Setup', '/organisation/setup'));
  }

  ngOnInit() {
    this.authStore.pipe(select(getCurrentUser)).subscribe((user: User) => {
      if (user != null && user.userName != null) {
        this.refreshTokenCredentials = new RefreshTokenCredentials(user.userName, user.refreshToken);
      }
    });

    this.subscriptions.add(
      this.authStore
        .select(isSetupComplete)
        .pipe(
          tap((setupComplete) => {
            if (setupComplete) {
              this.authStore.dispatch(AuthActions.RefreshToken({ payload: this.refreshTokenCredentials }));
            }
          }),
        )
        .subscribe(),
    );

    this.subscriptions.add(
      this.authStore
        .select(isTokenRefreshed)
        .pipe(
          tap((tokenRefreshed) => {
            if (tokenRefreshed) {
              this.router.navigateByUrl('/');
            }
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  formSubmitted($event) {
    const { setupForm } = $event;
    //    const { settingsForm } = $event;

    const organisation = new CreateOrganisationDTO();
    organisation.organisationName = setupForm.organisation;
    organisation.address1 = setupForm.addressLine1;
    organisation.address2 = setupForm.addressLine2;
    organisation.address3 = setupForm.addressLine3;
    organisation.address4 = setupForm.addressLine4;
    organisation.locality = setupForm.locality;
    organisation.townOrCity = setupForm.townOrCity;
    organisation.county = setupForm.county;
    organisation.country = setupForm.country;
    organisation.postCode = setupForm.postcode;

    this.authStore.dispatch(AuthActions.CreateOrganisation({ organisation }));
  }
}
