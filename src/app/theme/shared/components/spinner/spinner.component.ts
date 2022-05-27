import { Component, Input, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from 'src/app/utilities/loader/loader.service';
import { Spinkit } from './spinkits';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;

  public Spinkit = Spinkit;

  @Input() public backgroundColor = '#1abc9c';

  @Input() public spinner = Spinkit.skLine;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      },
    );

    this.loaderService.httpProgress().subscribe((status: boolean) => {
      this.isSpinnerVisible = status;
    });
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
