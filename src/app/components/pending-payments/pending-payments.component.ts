import { Component, OnInit, ElementRef } from '@angular/core';
import { VotersService } from '../../services/voters.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: []
})
export class PendingPaymentsComponent implements OnInit {
  public votersRewards: object[];
  private pendingPaymentsTable: any;
  private pendingPaymentsTableWidget: any;

  constructor(
    votersService: VotersService,
    private el: ElementRef
  ) {
    votersService.$votersRewards.subscribe(value => {
      this.votersRewards = value;
      this.updatePendingPayments();
    });
  }

  ngOnInit() {
  }

  public updatePendingPayments(): void {
    if (this.pendingPaymentsTableWidget) {
      this.pendingPaymentsTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.votersRewards,
      processing: true,
      ordering: true,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      order: [[3, 'desc']],
      dom: '<"top"f>rt<"bottom"l<"text-center"p>><"clear">',
      columns: [
        { data: 'Address' },
        { data: 'Address' },
        { data: 'VoteWeight' },
        { data: 'EarnedAmountXX' },
        { data: 'VoteDuration' }
      ],
      columnDefs: [
        {
          targets: [0],
          searchable: false
        },
        {
          render: function (data, type, row) {
            return '<a href="your-payments?address=' + data + '" target="_blank">See Payments</a>';
          },
          targets: 0,
          sortable: false,
          width: '10%'
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkAddress(data);
          },
          targets: 1
        },
        {
          render: function (data, type, row) {
            return '<span class="label label-primary label-block">' + TOOLS.getFormatedArkValue(data) + '</span>';
          },
          targets: 3
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkDuration(data);
          },
          targets: 4,
          orderData: [5]
        }
      ]
    }
    this.pendingPaymentsTable = $(this.el.nativeElement.querySelector('#KryptoVotersRewards'));
    this.pendingPaymentsTableWidget = this.pendingPaymentsTable.DataTable(tableOptions);
  }
}
