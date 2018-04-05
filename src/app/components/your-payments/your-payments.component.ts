import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KryptoService } from '../../services/krypto.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-your-payments',
  templateUrl: './your-payments.component.html',
  styleUrls: []
})
export class YourPaymentsComponent implements OnInit {
  public paymentRuns: object[];
  public earnings: any = 0;
  public address: string = null;
  public chartRefresh: boolean = false;
  public chartOptions: any = null;
  public chartDataset: any = [{
    data: [],
    lines: {
        fill: true
    }
  }];

  private addressSubscription: any;
  private payoutHistoryTable: any;
  private payoutHistoryTableWidget: any;
  private chartElement: any;

  constructor(
    private route: ActivatedRoute,
    private kryptoService: KryptoService,
    private el: ElementRef
  ) {
    this.chartOptions = {
      series: {
          lines: {
              show: true,
              lineWidth: 2,
              fill: true
          },
          points: { show: true }
      },
      colors: ['#1ab394'],
      grid: {
          color: '#999999',
          hoverable: true,
          clickable: true,
          tickColor: '#D4D4D4',
          borderWidth: 0
      },
      legend: {
          show: false
      },
      alignTicksWithAxis: 1,
      tooltip: true,
      tooltipOpts: {
          content: 'x: %x, y: %y'
      },
      xaxis: {
          mode: "time",
          timeformat: "%d %b %Y"
      }
    };
  }

  ngOnInit() {
    this.addressSubscription = this.route.queryParams.subscribe(params => {
      this.address = params['address'] || null;
      this.kryptoService.getDelegatePaymentRunDetailsForAddress(this.address).subscribe(
        value => {
          this.paymentRuns = value || [];
          this.updateEarnings();
          this.updatePayoutHistory();
        }
      );
    });
  }

  ngOnDestroy() {
    this.addressSubscription.unsubscribe();
  }

  private updateEarnings(): void {
    this.earnings = 0;
    this.chartDataset[0].data = [];
    this.paymentRuns.forEach((run) => {
      if (run['CreatedAt'] && run['EarnedAmountXX']) {
        this.earnings += run['EarnedAmountXX'];
        this.chartDataset[0].data.push([TOOLS.getMomentFromValue(run['CreatedAt']).valueOf(), run['EarnedAmountXX']]);
      }
    });
    this.earnings = TOOLS.getFormatedArkValue(this.earnings);
    this.chartRefresh = true;
  }

  public updatePayoutHistory(): void {
    if (this.payoutHistoryTableWidget) {
      this.payoutHistoryTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.paymentRuns,
      processing: true,
      ordering: true,
      searching: false,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      order: [[2, 'desc']],
      columns: [
          { data: 'Address' },
          { data: 'EarnedAmountXX' },
          { data: 'CreatedAt' },
          { data: 'CreatedAt' },
          { data: 'Transaction.id' },
          { data: 'VoteDuration' },
          { data: 'VoteDuration' }
      ],
      columnDefs: [
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkAddress(data);
          },
          targets: 0
        },
        {
          render: function (data, type, row) {
            return '<span class="label label-primary label-block">' + TOOLS.getFormatedArkValue(data) + '</span>';
          },
          width: '15%',
          targets: 1
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedDateTime(data);
          },
          width: '15%',
          targets: 2,
          orderData: [3]
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkTransactionAddress(data);
          },
          targets: 4
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkDuration(data);
          },
          targets: 5,
          orderData: [6]
        },
        {
          visible: false,
          searchable: false,
          targets: [3, 5]
        }
      ]
    }
    this.payoutHistoryTable = $(this.el.nativeElement.querySelector('#tblMyPayments'));
    this.payoutHistoryTableWidget = this.payoutHistoryTable.DataTable(tableOptions);
  }
}
