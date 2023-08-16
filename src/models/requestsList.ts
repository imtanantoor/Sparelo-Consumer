import RequestCardProps from './requestCard';

interface RequestsListProps {
  navigation: any;
  route: any;
  requests: RequestCardProps[];
  fetching: boolean;
  error: boolean;
  mode: 'buyer' | 'vendor';
  user: UserModel;
  fetchRequests: (userId: string) => void;
  fetchRequestsOfVendor: (userId: string) => void;
  creatingQuotationSuccess: boolean;
  orderCreated: boolean;
}

export default RequestsListProps;
