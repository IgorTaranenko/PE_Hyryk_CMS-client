import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.less']
})
export class AnalyticsPageComponent implements OnInit, OnChanges {

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) { 
    this.loaderService.startGlobalLoading();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.stopGlobalLoading();
    }, 0);
  }
  ngOnChanges() {
    console.log('onChanges');
  }

}
