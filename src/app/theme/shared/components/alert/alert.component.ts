import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: string;

  @Input() dismiss: string;

  // eslint-disable-next-line class-methods-use-this
  dismissAlert(element: any) {
    const { parentElement } = element;
    parentElement.removeChild(element);
  }
}
