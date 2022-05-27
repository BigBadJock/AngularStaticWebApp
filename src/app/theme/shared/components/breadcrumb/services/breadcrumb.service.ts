import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { Breadcrumb } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnInit {
  private static notFound = -1;

  private history: Breadcrumb[] = [];

  private historySubject = new BehaviorSubject<Breadcrumb[]>([]);

  history$: Observable<Breadcrumb[]> = this.historySubject.asObservable();

  private maxHistoryLength = 10;

  constructor(private localStorageService: LocalStorageService) { }
  
  ngOnInit(): void{

  }

  private static checkMatch(item: Breadcrumb, breadcrumb: Breadcrumb, index: number) {
    if (item.url === breadcrumb.url) {
      return index;
    }
    return BreadcrumbService.notFound;
  }

   private findExisting(breadcrumb: Breadcrumb) {
    let index = -1;
    for (let i = 0; i < this.history.length; i += 1) {
      const item = this.history[i];
      index = BreadcrumbService.checkMatch(item, breadcrumb, i);
      if (index > -1) break;
    }
    return index;
  }

  add(breadcrumb: Breadcrumb) {
    if (this.history.length === 0) {
      let loadedHistory = this.localStorageService.getSavedState('breadcrumbHistory');
      if (loadedHistory != null) {
        this.history = loadedHistory;
      }
    } 

    let itemIndex = BreadcrumbService.notFound;
    itemIndex = this.findExisting(breadcrumb);

    if (itemIndex === BreadcrumbService.notFound) {
      this.history.push(breadcrumb);
    }
    if (itemIndex !== BreadcrumbService.notFound) {
      this.history.splice(itemIndex, 1);
      this.history.push(breadcrumb);
    }
    if (this.history.length > this.maxHistoryLength) {
      this.history.splice(0, this.history.length - this.maxHistoryLength);
    }

    this.historySubject.next(this.history);

    this.localStorageService.setSavedState('breadcrumbHistory', this.history);
  }
}
