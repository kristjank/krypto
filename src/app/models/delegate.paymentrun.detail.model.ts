export class DelegatePaymentRunDetailModel {
  Pk: number;
  Address: string;
  VoteWeight: number;
  VoteWeightShare: number;
  EarnedAmount100: number;
  EarnedAmountXX: number;
  VoteDuration: number;
  Transaction: DelegatePaymentRunDetailTransactionModel;
  PaymentRecordID: number;
  CreatedAt: string;
}

export class DelegatePaymentRunDetailTransactionModel {
  id: string;
  timestamp: number;
  recipientId: string;
  amount: number;
  fee: number;
  type: number;
  vendorField: string;
  signature: string;
  signSignature: string;
  senderPublicKey: string;
  secondSenderPublicKey: string;
}
