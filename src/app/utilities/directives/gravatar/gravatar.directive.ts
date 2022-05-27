import { ElementRef, Renderer2, Directive, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { Md5 } from 'ts-md5/dist/md5';

@Directive({
  selector: '[appGravatar]',
})
export class GravatarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set user(user: User) {
    this.updateGravatar(user);
  }

  updateGravatar(user: User) {
    // There's an issue passing through to ui-avatars this way where it's taking the first two characters of
    // the firstname rather than the 1st of the firstname and 1st of the lastname
    const emailHash = Md5.hashStr(user.email.trim().toLowerCase());
    const initials = `${user.firstName.substr(0, 1)}${user.lastName.substr(0, 1)}`;
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      `//www.gravatar.com/avatar/${emailHash}?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${initials}/128/a0a0a0/ff0000/2`,
    );
  }
}
