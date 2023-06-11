interface UserModel {
  _id: string;
  name: string;
  contact: string;
  firebaseUid: string;
  rating: number;
  isBlocked: boolean;
  user_type: string[];
}
