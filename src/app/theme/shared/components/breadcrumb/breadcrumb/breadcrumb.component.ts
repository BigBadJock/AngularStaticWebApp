import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../models/breadcrumb.model';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  history: Breadcrumb[];

  ngOnInit(): void {
    this.breadcrumbService.history$.subscribe((history) => {
      this.history = history;
    });
  }
}
