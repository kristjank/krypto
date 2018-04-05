import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { KryptoService } from './krypto.service';
import { CONFIG } from '../app.config';

@Injectable()
export class SocialService {
  private socialTransactions:Subject<any> = new Subject<any>();
  private socialInfo:Subject<any> = new Subject<any>();
  private timer: any = null;

  public $socialTransactions = this.socialTransactions.asObservable();
  public $socialInfo = this.socialInfo.asObservable();

  constructor(
    private _kryptoService: KryptoService
  ) { }

  start(): void {
    this.timer = setInterval(() => {
      this.updateSocialData();
    }, CONFIG.REFRESH_INTERVAL_MS);
    this.updateSocialData();
  }

  public updateSocialData(): void {
    this.updateSocialTransactions();
    this.updateSocialInfo();
  }

  private updateSocialTransactions(): void {
    this._kryptoService.getSocialTransactions().subscribe(res => {
      this.socialTransactions.next(res);
    });
  }

  private updateSocialInfo(): void {
    this._kryptoService.getSocialInfo().subscribe(res => {
      this.socialInfo.next(res);
    });
  }
}
