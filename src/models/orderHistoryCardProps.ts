interface OrderHistoryCardProps {
  images: string[];
  make: string;
  model: string;
  year: string;
  requestedBy: string;
  category: string;
  orderStatus: string;
  approveOrder?: (id: string) => void;
  cancelOrder?: (id: string) => void;
  mode: 'buyer' | 'vendor';
  changingStatus?: boolean;
  changingStatusType?: string;
  id: string;
}

export default OrderHistoryCardProps;
