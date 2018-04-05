import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { KryptoService } from './krypto.service';
import { CONFIG } from '../app.config';

@Injectable()
export class VotersService {
  private votersActive:Subject<any> = new Subject<any>();
  private votersBlocked:Subject<any> = new Subject<any>();
  private votersRewards:Subject<any> = new Subject<any>();
  private timer: any = null;

  public $votersActive = this.votersActive.asObservable();
  public $votersBlocked = this.votersBlocked.asObservable();
  public $votersRewards = this.votersRewards.asObservable();

  constructor(
    private _kryptoService: KryptoService
  ) { }

  start(): void {
    this.timer = setInterval(() => {
      this.updateVoters();
    }, CONFIG.REFRESH_INTERVAL_MS);
    this.updateVoters();
  }

  public updateVoters(): void {
    this.updateVotersActive();
    this.updateVotersBlocked();
    this.updateVotersRewards();
  }

  private updateVotersActive(): void {
    this._kryptoService.getVotersActive().subscribe(res => {
      this.votersActive.next(res);
    });
  }

  private updateVotersBlocked(): void {
    this._kryptoService.getVotersBlocked().subscribe(res => {
      let blockedList = [];
      if (res.length !== 1 && res[0] !== '') {
        blockedList = res;
      }
      this.votersBlocked.next(blockedList);
    });
  }

  private updateVotersRewards(): void {
    this._kryptoService.getVotersRewards().subscribe(res => {
      this.votersRewards.next(res);
    });
  }
}
