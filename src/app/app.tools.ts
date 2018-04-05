import { ParsePipe } from 'angular2-moment';

export const TOOLS = {
  getFormatedDateTime(value): string {
    let d = new ParsePipe();
    return d.transform(value, '').format('YYYY-MMM-DD HH:mm');
  },
  getFormatedArkAddress(address): string {
    return '<a href="https://explorer.ark.io/address/' + address + '" target="_blank">' + address + '</a>';
  },
  getFormatedArkValue(value): string {
    return parseFloat(value).toFixed(8);
  },
  getFormatedArkTransactionAddress(tid): string {
    return '<a href="https://explorer.ark.io/tx/' + tid + '" target="_blank">View Tx</a>';
  },
  getFormatedArkDuration(value): string {
    var res = '<span class="label label-info">' + value + ' h</span>';

    var nDays = value / 24;
    var nYears = nDays / 365;

    if (nYears > 1) {
      res += ' <span class="label">over a year</span>';
    }
    else {
      var nMonths = nDays / 30;

      if (nMonths > 2)
          res += ' <span class="label">around ' + Math.floor(nMonths) + ' months</span>';
      else if (nMonths > 1)
          res += ' <span class="label">over a month</span>';
      else
          res += ' <span class="label">around ' + Math.floor(nDays) + ' days</span>';
    }

    return res;
  },
  getMomentFromValue(value): any {
    let d = new ParsePipe();
    return d.transform(value, '');
  }
}
