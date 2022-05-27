import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/site.model';
import { SiteEntityService } from 'src/app/store/site-entity.service';
@Component({
  selector: 'app-site-modify-shell',
  templateUrl: './site-modify-shell.component.html',
  styleUrls: ['./site-modify-shell.component.scss']
})
export class SiteModifyShellComponent implements OnInit {

  @Input() site: Site;

  constructor(public activeModal: NgbActiveModal, private siteEntityService: SiteEntityService) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.dismiss();
  }

  formSubmitted(form: any) {
    let updatedSite = { ...this.site };
    updatedSite.name = form.siteName;

    this.siteEntityService.update(updatedSite).subscribe((x: Site) => {
      this.site = x;
      this.activeModal.dismiss();
    })
  }


}
