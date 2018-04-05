export class DelegateNodeStatusModel {
  success: boolean;
  height: number;
  forgingAllowed: boolean;
  currentSlot: number;
  header: DelegateNodeStatusHeaderModel;
}

export class DelegateNodeStatusHeaderModel {
  id: string;
  version: number;
  height: number;
  timestamp: number;
  previousBlock: string;
  numberOfTransactions: number;
  totalAmount: number;
  totalFee: number;
  reward: number;
  payloadLength: number;
  payloadHash: string;
  generatorPublicKey: string;
  blockSignature: string;
  transactions: any;
}
