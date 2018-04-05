import { Component, OnInit } from '@angular/core';
import { ParsePipe } from 'angular2-moment';
import linkifyHtml from 'linkifyjs/html';
import { DelegateService } from '../../services/delegate.service';
import { VotersService } from '../../services/voters.service';
import { NodeService } from '../../services/node.service';
import { SocialService } from '../../services/social.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {
  public arkStartTimestamp: number = 1490101200;
  public delegate: any = null;
  public delegateConfig: any = null;
  public delegatePaymentRuns: any = [];
  public votersRewards: any = null;
  public nodeStatus: any = null;
  public socialTransactions: any = null;
  public socialInfo: any = null;
  public newsPages: any = [];
  public currentNewsPage: any = 1;
  public maxNewsPages: any = null;
  public chartRefresh: boolean = false;
  public chartOptions: any = null;
  public chartDataset: any = [{
    label: 'Vote Height (Ѧ)',
    lines: { show: true, fill: true, fillColor: "rgba(26, 179, 148, 0.2)" },
    data: []
  }, {
    label: 'Num. of Transactions',
    lines: { show: true, fill: true, fillColor: "rgba(148, 26, 179, 0.1)" },
    data: [],
    yaxis: 2,
  }];

  constructor(
    delegateService: DelegateService,
    votersService: VotersService,
    nodeService: NodeService,
    socialService: SocialService
  ) {
    this.chartOptions = {
      colors: ['#1ab394', '#941ab3'],
      grid: {
        color: '#999999',
        hoverable: false,
        clickable: false,
        tickColor: '#D4D4D4',
        borderWidth: 0
      },
      legend: {
        labelBoxBorderColor: '#EEEEEE',
        position: 'nw'
      },
      alignTicksWithAxis: 1,
      tooltip: true,
      tooltipOpts: {
        content: 'x: %x, y: %y'
      },
      xaxis: {
        mode: 'time',
        timeformat: '%d %b %Y'
      },
      yaxes: [
        {
          show: true,
          axisLabel: 'Weight',
          points: { show: false },
          axisLabelUseCanvas: true,
          tickFormatter: function (v, axis) {
            return v + ' Ѧ';
          }
        },
        {
          show: true,
          axisLabel: 'Number',
          color: '#941ab3',
          position: 'right',
          axisLabelUseCanvas: true
        }
      ]
    };

    delegateService.$delegate.subscribe(value => this.delegate = value);
    delegateService.$delegateConfig.subscribe(value => this.delegateConfig = value);
    delegateService.$delegatePaymentRuns.subscribe(value => {
      this.delegatePaymentRuns = value;
      this.updateChartData();
    });
    votersService.$votersRewards.subscribe(value => this.votersRewards = value);
    nodeService.$nodeStatus.subscribe(value => this.nodeStatus = value);
    socialService.$socialInfo.subscribe(value => this.socialInfo = value);
    socialService.$socialTransactions.subscribe(value => {
      this.socialTransactions = value;
      this.socialTransactions.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      }).map(transaction => {
        transaction.vendorField = linkifyHtml(transaction.vendorField);
        return transaction;
      });

      this.maxNewsPages = Math.ceil(this.socialTransactions.length / 5);
      this.updatePageNumbers();
    });
  }

  ngOnInit() {
  }

  public nextPage(): void {
    this.currentNewsPage++;
    if (this.currentNewsPage > this.maxNewsPages) {
      this.currentNewsPage = this.maxNewsPages;
    }
    this.updatePageNumbers();
  }

  public previousPage(): void {
    this.currentNewsPage--;
    if (this.currentNewsPage < 1) {
      this.currentNewsPage = 1;
    }
    this.updatePageNumbers();
  }

  public goToPage(pageNumber): void {
    if (pageNumber === '...') {
      return;
    }
    this.currentNewsPage = pageNumber;
    if (this.currentNewsPage < 1) {
      this.currentNewsPage = 1;
    } else if (this.currentNewsPage > this.maxNewsPages) {
      this.currentNewsPage = this.maxNewsPages;
    }
    this.updatePageNumbers();
  }

  private updateChartData(): void {
    this.chartDataset[0].data = [];
    this.chartDataset[1].data = [];
    this.delegatePaymentRuns.forEach((run) => {
      if (run['CreatedAt'] && run['VoteWeight'] && run['NrOfTransactions']) {
        this.chartDataset[0].data.push([
          TOOLS.getMomentFromValue(run['CreatedAt']).valueOf(),
          TOOLS.getFormatedArkValue(run['VoteWeight'] / Math.pow(10, 8))
        ]);
        this.chartDataset[1].data.push([
          TOOLS.getMomentFromValue(run['CreatedAt']).valueOf(),
          run['NrOfTransactions']
        ]);
      }
    });
    this.chartRefresh = true;
  }

  private updatePageNumbers(): void {
    this.newsPages = [];
    if (this.currentNewsPage <= 4) {
      for (let i = 1; i <= Math.min(5, this.maxNewsPages); i++) {
        this.newsPages.push({
          number: i
        });
      }
      if (this.maxNewsPages > 5) {
        this.newsPages.push({
          number: '...',
          inBetween: true
        });
      }
    } else if (this.currentNewsPage > this.maxNewsPages - 5) {
      this.newsPages.push({
        number: '...',
        inBetween: true
      });
      for (let i = this.maxNewsPages - 4; i <= this.maxNewsPages; i++) {
        this.newsPages.push({
          number: i
        });
      }
    } else {
      this.newsPages.push({
        number: 1
      });
      this.newsPages.push({
        number: '...',
        inBetween: true
      });
      for (let i = this.currentNewsPage - 1; i <= this.currentNewsPage + 1; i++) {
        this.newsPages.push({
          number: i
        });
      }
      this.newsPages.push({
        number: '...',
        inBetween: true
      });
      this.newsPages.push({
        number: this.maxNewsPages
      });
    }
  }
}
