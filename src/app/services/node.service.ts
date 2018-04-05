import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { KryptoService } from './krypto.service';
import { CONFIG } from '../app.config';

@Injectable()
export class NodeService {
  private nodeStatus:Subject<any> = new Subject<any>();
  private timer: any = null;

  public $nodeStatus = this.nodeStatus.asObservable();

  constructor(
    private _kryptoService: KryptoService
  ) { }

  start(): void {
    this.timer = setInterval(() => {
      this.updateNodeStatus();
    }, CONFIG.REFRESH_INTERVAL_MS);
    this.updateNodeStatus();
  }

  public updateNodeStatus(): void {
    this._kryptoService.getNodeStatus().subscribe(res => {
      this.nodeStatus.next(res);
    });
  }
}
