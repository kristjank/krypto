import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { KryptoService } from './krypto.service';
import { DelegateModel } from '../models/delegate.model';
import { DelegateConfigModel } from '../models/delegate.config.model';
import { DelegatePaymentRunModel } from '../models/delegate.paymentrun.model';
import { CONFIG } from '../app.config';

@Injectable()
export class DelegateService {
  private delegate:Subject<DelegateModel> = new Subject<DelegateModel>();
  private delegateConfig:Subject<DelegateConfigModel> = new Subject<DelegateConfigModel>();
  private delegatePaymentRuns:Subject<any> = new Subject<any>();
  private timer: any = null;

  public $delegate = this.delegate.asObservable();
  public $delegateConfig = this.delegateConfig.asObservable();
  public $delegatePaymentRuns = this.delegatePaymentRuns.asObservable();

  constructor(
    private _kryptoService: KryptoService
  ) { }

  start(): void {
    this.timer = setInterval(() => {
      this.updateDelegateData();
    }, CONFIG.REFRESH_INTERVAL_MS);
    this.updateDelegateData();
  }

  public updateDelegateData(): void {
    this.updateDelegate();
    this.updateDelegateConfig();
    this.updateDelegatePaymentRuns();
  }

  private updateDelegate(): void {
    this._kryptoService.getDelegate().subscribe(res => {
      this.delegate.next(res);
    });
  }

  private updateDelegateConfig(): void {
    this._kryptoService.getDelegateConfig().subscribe(res => {
      this.delegateConfig.next(res);
    });
  }

  private updateDelegatePaymentRuns(): void {
    this._kryptoService.getDelegatePaymentRuns().subscribe(res => {
      this.delegatePaymentRuns.next(res);
    });
  }
}
