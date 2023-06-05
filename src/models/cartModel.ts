import {CartCardProps} from '../components/global/CartCard';

export interface CartDataModel extends CartCardProps {
  id: string | number;
  bid: string | number;
}

interface CartModel {
  total: number;
  data: CartDataModel[];
}

export default CartModel;
