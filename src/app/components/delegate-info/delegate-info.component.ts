import { Component, OnInit, ElementRef } from '@angular/core';
import { DelegateService } from '../../services/delegate.service';
import { VotersService } from '../../services/voters.service';
import { SocialService } from '../../services/social.service';
import { TOOLS } from '../../app.tools';

@Component({
  selector: 'app-delegate-info',
  templateUrl: './delegate-info.component.html',
  styleUrls: []
})
export class DelegateInfoComponent implements OnInit {
  public delegate: any = null;
  public delegateConfig: any = null;
  public votersActive: object[];
  public votersBlocked: object[];
  public socialInfo: any = {};

  private votersTable: any;
  private votersTableWidget: any;
  private blockedVotersTable: any;
  private blockedVotersTableWidget: any;

  constructor(
    delegateService: DelegateService,
    votersService: VotersService,
    socialService: SocialService,
    private el: ElementRef
  ) {
    delegateService.$delegate.subscribe(value => this.delegate = value);
    delegateService.$delegateConfig.subscribe(value => this.delegateConfig = value);
    votersService.$votersActive.subscribe(value => {
      this.votersActive = value;
      this.updateVoters();
    });
    votersService.$votersBlocked.subscribe(value => {
      this.votersBlocked = value;
      this.updateBlockedVoters();
    });
    socialService.$socialInfo.subscribe(value => this.socialInfo = value);
  }

  ngOnInit() {}

  public updateVoters(): void {
    if (this.votersTableWidget) {
      this.votersTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.votersActive,
      processing: true,
      ordering: true,
      searching: false,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      order: [[2, 'desc']],
      columns: [
        { data: 'address' },
        { data: 'address' },
        { data: 'balance' }
      ],
      columnDefs: [
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
            return '<span class="label label-primary label-block">' + TOOLS.getFormatedArkValue(parseInt(data) / Math.pow(10, 8)) + '</span>';
          },
          targets: 2
        }
      ]
    }
    this.votersTable = $(this.el.nativeElement.querySelector('#tblVoters'));
    this.votersTableWidget = this.votersTable.DataTable(tableOptions);
  }

  public updateBlockedVoters(): void {
    if (this.blockedVotersTableWidget) {
      this.blockedVotersTableWidget.destroy();
    }
    let tableOptions: any = {
      data: this.votersBlocked,
      processing: true,
      ordering: true,
      searching: false,
      paging: true,
      pageLength: 10,
      bLengthChange: false,
      order: [[0, 'asc']],
      columns: [
        { data: 'address' }
      ],
      columnDefs: [
        {
          render: function (data, type, row) {
            return TOOLS.getFormatedArkAddress(data);
          },
          targets: 0
        }
      ]
    }
    this.blockedVotersTable = $(this.el.nativeElement.querySelector('#tblVotersBlocked'));
    this.blockedVotersTableWidget = this.blockedVotersTable.DataTable(tableOptions);
  }
}
