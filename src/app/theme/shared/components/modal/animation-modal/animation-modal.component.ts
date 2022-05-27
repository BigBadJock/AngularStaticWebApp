import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-animation-modal',
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnimationModalComponent {
  @Input() modalClass: string;

  @Input() contentClass: string;

  @Input() modalID: string;

  @Input() backDrop = false;

  // eslint-disable-next-line class-methods-use-this
  public close(event) {
    document.querySelector(`#${event}`).classList.remove('md-show');
  }
}
