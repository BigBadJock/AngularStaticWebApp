import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrganisationRoutingModule } from './organisation.routing.module';
import { OrganisationEffects } from './store/organisation.effects';
import { OrganisationResolver } from './store/organisation.resolver';
import { OrganisationService } from './services/organisation.service';
import * as fromOrganisation from './store/organisation.reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    StoreModule.forFeature(fromOrganisation.organisationFeatureKey, fromOrganisation.organisationReducer),
    EffectsModule.forFeature([OrganisationEffects]),
  ],

  providers: [OrganisationResolver, OrganisationService],
})
export class OrganisationModule {}
