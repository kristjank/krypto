import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../app.config';
import { DelegateModel } from '../models/delegate.model';
import { DelegateConfigModel }  from '../models/delegate.config.model';
import { DelegateNodeStatusModel, DelegateNodeStatusHeaderModel } from '../models/delegate.nodestatus.model';
import { DelegatePaymentRunModel }  from '../models/delegate.paymentrun.model';
import { DelegatePaymentRunDetailModel, DelegatePaymentRunDetailTransactionModel } from '../models/delegate.paymentrun.detail.model';
import { VotersModel } from '../models/voters.model';
import { VotersBlockedModel } from '../models/voters.blocked.model';
import { VotersRewardsModel } from '../models/voters.rewards.model';
import { SocialTransactionModel } from '../models/social.transaction.model';
import { SocialInfoModel } from '../models/social.info.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class KryptoService {
  private baseUrl: string = CONFIG.API_URL;

  constructor(
    private http: Http
  ) { }

  private getRequest(endpoint, response?): Observable<any> {
    let processResponse = function(res: Response) {
      return res.json();
    }
    return this.http.get(`${this.baseUrl}/${endpoint}`)
      .map(response || processResponse)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getDelegate(): Observable<any> {
    return this.getRequest('delegate', res => {
      return Object.assign(new DelegateModel(), res.json().delegate);
    });
  }

  public getDelegateConfig(): Observable<any> {
    return this.getRequest('delegate/config', res => {
      return Object.assign(new DelegateConfigModel(), res.json());
    });
  }

  public getNodeStatus(): Observable<any> {
    return this.getRequest('delegate/nodestatus', res => {
      let newData = Object.assign(new DelegateNodeStatusModel(), res.json());
      newData['header'] = Object.assign(new DelegateNodeStatusHeaderModel(), res.json().header);

      return newData;
    });
  }

  public getDelegatePaymentRuns(): Observable<any> {
    return this.getRequest('delegate/paymentruns', res => {
      let data = [];
      if (res.json().success) {
        res.json().data.forEach(run => {
          data.push(Object.assign(new DelegatePaymentRunModel(), run));
        });
      }

      return data;
    });
  }

  public getDelegatePaymentRunDetailsForAddress(address): Observable<any> {
    return this.getRequest(`delegate/paymentruns/details?address=${address}`, res => {
      let data = [];
      if (res.json().success) {
        res.json().data.forEach(run => {
          let newRun = Object.assign(new DelegatePaymentRunDetailModel(), run);
          newRun['Transaction'] = Object.assign(new DelegatePaymentRunDetailTransactionModel(), run['Transaction']);
          data.push(newRun);
        });
      }

      return data;
    });
  }

  public getDelegatePaymentTransactions(transactionId): Observable<any> {
    return this.getRequest(`delegate/paymentruns/details?parentid=${transactionId}`, res => {
      let data = [];
      if (res.json().success) {
        res.json().data.forEach(run => {
          let newRun = Object.assign(new DelegatePaymentRunDetailModel(), run);
          newRun['Transaction'] = Object.assign(new DelegatePaymentRunDetailTransactionModel(), run['Transaction']);
          data.push(newRun);
        });
      }

      return data;
    });
  }

  public getVotersActive(): Observable<any> {
    return this.getRequest('voters', res => {
      let data = [];
      if (res.json().success) {
        res.json().accounts.forEach(voter => {
          data.push(Object.assign(new VotersModel(), voter));
        });
      }

      return data;
    });
  }

  public getVotersBlocked(): Observable<any> {
    return this.getRequest('voters/blocked', res => {
      let data = [];
      res.json().blockedList.forEach(voter => {
        data.push(Object.assign(new VotersBlockedModel(), {address: voter}));
      });

      return data;
    });
  }

  public getVotersRewards(): Observable<any> {
    return this.getRequest('voters/rewards', res => {
      let data = [];
      res.json().data.forEach(voter => {
        data.push(Object.assign(new VotersRewardsModel(), voter));
      });

      return data;
    });
  }

  public getSocialTransactions(): Observable<any> {
    return this.getRequest('social', res => {
      let data = [];
      if (res.json().success) {
        res.json().transactions.forEach(social => {
          data.push(Object.assign(new SocialTransactionModel(), social));
        });
      }

      return data;
    });
  }

  public getSocialInfo(): Observable<any> {
    return this.getRequest('social/info', res => {
      return Object.assign(new SocialInfoModel(), res.json());
    });
  }
}
