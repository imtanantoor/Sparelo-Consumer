interface ChangeAvailabilityStatusModel {
  id: string;
  isAvailable: boolean;
  onSuccess: () => void;
  onError: () => void;
}

export default ChangeAvailabilityStatusModel;
