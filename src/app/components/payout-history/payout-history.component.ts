import { Component, OnInit, ElementRef } from '@angular/core';
import { DelegateService } from '../../services/delegate.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-payout-history',
  templateUrl: './payout-history.component.html',
  styleUrls: []
})
export class PayoutHistoryComponent implements OnInit {
  public delegatePaymentRuns: object[];
  private paymentRunsTable: any;
  private paymentRunsTableWidget: any;

  constructor(
    delegateService: DelegateService,
    private el: ElementRef
  ) {
    delegateService.$delegatePaymentRuns.subscribe(value => {
      this.delegatePaymentRuns = value;
      this.updatePaymentRuns();
    });
  }

  ngOnInit() {
  }

  public updatePaymentRuns(): void {
    if (this.paymentRunsTableWidget) {
      this.paymentRunsTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.delegatePaymentRuns,
      processing: true,
      ordering: true,
      searching: false,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      order: [[0, 'desc']],
      columns: [
        { data: 'CreatedAt' },
        { data: 'CreatedAt' },
        { data: 'ShareRatio' },
        { data: 'Fidelity' },
        { data: 'FeeDeduction' },
        { data: 'NrOfTransactions' },
        { data: 'Pk' }
      ],
      columnDefs: [
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedDateTime(data);
          },
          targets: 0,
          orderData: [1]
        },
        {
          visible: false,
          targets: 1
        },
        {
          render: function (data, type, row) {
            return '<a class="btn btn-block btn-xs btn-primary" href="transactions?pk=' + data + '&ts=' + row.CreatedAt + '" target="blank">DETAILS</a>';
          },
          targets: 6
        }
      ]
    }
    this.paymentRunsTable = $(this.el.nativeElement.querySelector('#tblKryptoPayments'));
    this.paymentRunsTableWidget = this.paymentRunsTable.DataTable(tableOptions);
  }
}
