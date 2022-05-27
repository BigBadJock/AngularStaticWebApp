import { Router } from "@angular/router";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockComponent } from "ng-mocks";
import { BreadcrumbService } from "src/app/theme/shared/components/breadcrumb/services/breadcrumb.service";
import { SiteEntityService } from "../../store/site-entity.service";
import { SiteCreateDisplayComponent } from "../site-create-display/site-create-display.component";
import { SiteCreateShellComponent } from "./site-create-shell.component";

describe('SiteCreateShellComponent', () => {
  let spectator: Spectator<SiteCreateShellComponent>;
  let mockSiteCreateDisplayComponent = MockComponent(SiteCreateDisplayComponent);

  const createComponent = createComponentFactory({
    component: SiteCreateShellComponent,
    declarations:[mockSiteCreateDisplayComponent],
    mocks: [BreadcrumbService, Router, SiteEntityService],
  });

  beforeEach(() => spectator = createComponent());

  test('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  

});
