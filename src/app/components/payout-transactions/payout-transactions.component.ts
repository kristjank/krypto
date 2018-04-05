import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KryptoService } from '../../services/krypto.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-payout-transactions',
  templateUrl: './payout-transactions.component.html',
  styleUrls: []
})
export class PayoutTransactionsComponent implements OnInit {
  public delegatePaymentTransactions: object[];
  private paymentTransactionsTable: any;
  private paymentTransactionsTableWidget: any;

  public pk: number = null;
  public timestamp: string = null;
  private querySubscription: any = null;

  constructor(
    private route: ActivatedRoute,
    private kryptoService: KryptoService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe(params => {
      this.pk = params['pk'] || null;
      this.timestamp = params['ts'] || null;
      this.kryptoService.getDelegatePaymentTransactions(this.pk).subscribe(
        value => {
          this.delegatePaymentTransactions = value;
          this.updatePaymentTransactions();
        }
      );
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  public updatePaymentTransactions(): void {
    if (this.paymentTransactionsTableWidget) {
      this.paymentTransactionsTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.delegatePaymentTransactions,
      responsive: true,
      processing: true,
      ordering: true,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      dom: '<"top"f>rt<"bottom"l<"text-center"p>><"clear">',
      columns: [
        { data: 'Address' },
        { data: 'VoteWeight' },
        { data: 'EarnedAmountXX' },
        { data: 'VoteDuration' },
        { data: 'VoteDuration' },
        { data: 'Transaction.id' }
      ],
      columnDefs: [
        {
          targets: [1, 2, 3],
          searchable: false
        },
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
          targets: 2
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkDuration(data);
          },
          targets: 3,
          orderData: [4]
        },
        {
          visible: false,
          targets: 4
        },
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkTransactionAddress(data);
          },
          targets: 5
        }
      ]
    }
    this.paymentTransactionsTable = $(this.el.nativeElement.querySelector('#KryptoPaymentTransactions'));
    this.paymentTransactionsTableWidget = this.paymentTransactionsTable.DataTable(tableOptions);
  }
}
