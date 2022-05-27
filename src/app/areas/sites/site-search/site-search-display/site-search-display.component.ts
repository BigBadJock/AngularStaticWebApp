import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-site-search-display',
  templateUrl: './site-search-display.component.html',
  styleUrls: ['./site-search-display.component.scss'],
})
export class SiteSearchDisplayComponent {
  @Input() sites: Site[];
  @Output() addClicked = new EventEmitter();

  addClick(): void{
    this.addClicked.emit('true');
  }

  byId(site: Site) {
    return site.id;
  }
}
