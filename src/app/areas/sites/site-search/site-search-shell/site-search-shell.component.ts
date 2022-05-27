import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site.model';
import { SiteEntityService } from 'src/app/store/site-entity.service';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';


@Component({
  selector: 'app-site-search-shell',
  templateUrl: './site-search-shell.component.html',
  styleUrls: ['./site-search-shell.component.scss'],
})
export class SiteSearchShellComponent implements OnInit {
  sites$: Observable<Site[]>;


  constructor(private siteEntityService: SiteEntityService, private breadCrumbService: BreadcrumbService, private router: Router) {
    this.sites$ = siteEntityService.entities$;
    this.breadCrumbService.add(new Breadcrumb('Sites', '/sites'));
  }

  ngOnInit(): void{
    this.siteEntityService.getWithQuery('$sort_by=name');
  }

  addClicked(): void{
    this.router.navigateByUrl('/sites/create')
  }
}
