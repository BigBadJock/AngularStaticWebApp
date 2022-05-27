import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrganisationStats } from 'src/app/models/organisationStats';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService],
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(DashboardService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load stats for an organisation', () => {
    const orgId = 'aaa-000';
    const stats = new OrganisationStats();
    stats.noOfPlots = 100;
    stats.noOfSites = 1;
    stats.organisationId = orgId;
    stats.uncultivatedPlots = 2;
    stats.unletPlots = 3;
    stats.waitingList = 5;

    service.getStats(orgId).subscribe((s: OrganisationStats) => {
      expect(s.organisationId === orgId);
      expect(s.noOfPlots === stats.noOfPlots);
    });

    const req = httpTestingController.expectOne(`http://localhost:7071/api/organisation/stats/${orgId}`);
    expect(req.request.method).toEqual('GET');
    req.flush({ stats });
  });
});
