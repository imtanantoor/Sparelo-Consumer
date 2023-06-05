import {createSlice, current} from '@reduxjs/toolkit';
import CartModel from '../../models/cartModel';
import ToastService from '../../Services/ToastService';

const initialState: CartModel = {
  total: 0,
  data: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const {payload} = action;

      if (
        state.data.filter((cartItem: any) => cartItem.bid == payload.bid)
          .length == 0
      ) {
        state.total = state.total + payload.price;
        state.data.push(action.payload);
      } else {
        ToastService.warning('Add to Cart', 'Item already in cart');
      }
    },
    removeFromCart: (state, action) => {
      const {payload} = action;
      state.data = state.data.filter((item: any) => item.bid !== payload);
    },
    reset: () => initialState,
  },
});

export default cartSlice;
