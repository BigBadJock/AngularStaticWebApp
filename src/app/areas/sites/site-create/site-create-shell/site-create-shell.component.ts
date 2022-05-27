import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/site.model';
import { SiteEntityService } from 'src/app/store/site-entity.service';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';

@Component({
  selector: 'app-site-create-shell',
  templateUrl: './site-create-shell.component.html',
  styleUrls: ['./site-create-shell.component.scss']
})
export class SiteCreateShellComponent implements OnInit {

  constructor( private breadCrumbService: BreadcrumbService, private siteEntityService: SiteEntityService, private router: Router) {
  }

  ngOnInit(): void {
      const b = new Breadcrumb('New Site', `/sites/create`);
      this.breadCrumbService.add(b);    
  }

  formSubmitted(form: any) {
    const site: Site = new Site();
    site.name = form.siteName;
    site.numberOfPlots = form.noOfPlots;

    this.siteEntityService.add(site);
    this.router.navigateByUrl("/sites");
  }

  cancelled($event) {
    this.router.navigateByUrl("/sites");
  }

}
