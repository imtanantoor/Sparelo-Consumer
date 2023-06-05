import RequestCardProps from './requestCard';

interface RequestsListProps {
  navigation: any;
  route: any;
  requests: RequestCardProps[];
  fetching: boolean;
  error: boolean;
  fetchRequests: (userId: string) => void;
}

export default RequestsListProps;
