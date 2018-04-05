export class SocialTransactionModel {
  id: string;
  timestamp: number;
  recipientId: string;
  amount: number;
  fee: number;
  type: number;
  vendorField: string;
  signature: string;
  senderPublicKey: string;
  blockid: string;
  senderId: string;
  confirmations: number;
}
