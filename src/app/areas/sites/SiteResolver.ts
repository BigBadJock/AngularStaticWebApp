import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first } from 'rxjs/operators';
import { SiteEntityService } from 'src/app/store/site-entity.service';

@Injectable()
export class SiteResolver implements Resolve<boolean> {
  constructor(private siteEntityService: SiteEntityService) {}

  resolve(): Observable<boolean> {
    return this.siteEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.siteEntityService.getWithQuery('$sort_by=name');
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
