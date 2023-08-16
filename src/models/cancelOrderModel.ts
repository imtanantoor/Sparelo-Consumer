interface cancelOrderPayload {
  id: string;
  cancelledBy: 'Seller' | 'Buyer';
  reasonOfCancellation?: string;
}

export default cancelOrderPayload;
