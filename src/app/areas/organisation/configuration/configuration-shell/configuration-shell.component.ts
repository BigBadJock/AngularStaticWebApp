import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Organisation } from 'src/app/models/organisation.model';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';
import { OrganisationState } from '../../store/organisation.reducers';
import { getOrganisation } from '../../store/organisation.selectors';

@Component({
  selector: 'app-configuration-shell',
  templateUrl: './configuration-shell.component.html',
  styleUrls: ['./configuration-shell.component.scss'],
})
export class ConfigurationShellComponent implements OnInit {
  organisation: Organisation;

  constructor(private organisationStore: Store<OrganisationState>, private breadCrumbService: BreadcrumbService) {
    this.breadCrumbService.add(new Breadcrumb('Configuration', '/organisation/configuration'));
  }

  ngOnInit(): void {
    // this.organisationStore.dispatch(loadOrganisation({ organisationId: 1 }));

    this.organisationStore.pipe(select(getOrganisation)).subscribe((organisation) => {
      this.organisation = organisation;
    });
  }
}
