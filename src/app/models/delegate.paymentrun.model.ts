export class DelegatePaymentRunModel {
  Pk: number;
  Delegate: string;
  DelegatePubKey: string;
  ShareRatio: number;
  CostsRatio: number;
  ReserveRatio: number;
  PersonalRatio: number;
  Fidelity: boolean;
  FidelityLimit: number;
  MinAmount: number;
  FeeDeduction: boolean;
  FeeAmount: number;
  NrOfTransactions: number;
  VoteWeight: number;
  Network: string;
  Blocklist: string;
  Whitelist: number;
  CapBalance: boolean;
  BalanceCapAmount: number;
  BlockBalanceCap: boolean;
  PriceBTC: number;
  PriceUSD: number;
  PriceEUR: number;
  SourceIP: number;
  CreatedAt: string;
  ArkGoPoolVersion: string;
}
