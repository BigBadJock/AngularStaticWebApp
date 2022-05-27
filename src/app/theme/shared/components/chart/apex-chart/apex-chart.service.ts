import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ApexChartService {
  @Output() changeTimeRange: EventEmitter<boolean> = new EventEmitter();

  @Output() changeSeriesData: EventEmitter<boolean> = new EventEmitter();

  eventChangeTimeRange() {
    this.changeTimeRange.emit();
  }

  eventChangeSeriesData() {
    this.changeSeriesData.emit();
  }
}
