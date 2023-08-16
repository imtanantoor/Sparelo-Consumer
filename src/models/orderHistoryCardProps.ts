import cancelOrderPayload from './cancelOrderModel';

interface OrderHistoryCardProps {
  images: string[];
  make: string;
  model: string;
  year: string;
  requestedBy: string;
  category: string;
  orderStatus: string;
  approveOrder?: (orderId: string) => void;
  cancelOrder?: (data: cancelOrderPayload) => void;
  submitting: boolean;
  mode: 'vendor' | 'buyer';
  changingStatus?: boolean;
  changingStatusType?: string;
  id: string;
  sellerId: string;
}

export default OrderHistoryCardProps;
