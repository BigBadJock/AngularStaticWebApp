import { Component, Input } from '@angular/core';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
})
export class SiteCardComponent {
  @Input() site: Site;
}
