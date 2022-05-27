import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganisationStats } from 'src/app/models/organisationStats';

@Component({
  selector: 'app-dashboard-site-info',
  templateUrl: './dashboard-site-info.component.html',
  styleUrls: ['./dashboard-site-info.component.scss'],
})
export class DashboardSiteInfoComponent implements OnInit, OnChanges {
  @Input() organisationStats: OrganisationStats;

  rentedPlotPercentage: number;
  rentalChartOptions: any;

  constructor(private router: Router){}

  ngOnInit(): void{
  }

  ngOnChanges() {
    const rented = this.organisationStats.noOfPlots - this.organisationStats.unletPlots;
    const onePerc = this.organisationStats.noOfPlots / 100;
    this.rentedPlotPercentage = rented / onePerc / 100;
    this.rentalChartOptions = this.buildDonutChart(['Let', 'Unlet'], [rented, this.organisationStats.unletPlots]);

  }

  goToSites() {
    this.router.navigateByUrl('/sites');
  }

  buildDonutChart(labels: string[], data: number[]) {
    const options = {
      series: data,
      chart: {
        width: 100,
        type: 'pie',
      },
      labels,
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
    };
    return options;
  }
}
