import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0, showDetailPics: false },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) {
        state.items.push({
          id: item.id,
          image: item.imgae,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
        });
      } else {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.quantity * item.price;
      }
      state.totalQuantity += item.quantity;
    },
    removeFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((i) => i.id === id);
      // if (existingItem.quantity === 1) {
      //   state.items = state.items.filter((item) => item.id !== id);
      // } else {
      //   existingItem.quantity--;
      //   existingItem.totalPrice -= existingItem.price;
      //   existingItem.totalQuantity--;
      // }
      state.totalQuantity -= existingItem.quantity;
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    toggleShowDetailPics(state) {
      state.showDetailPics = !state.showDetailPics;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
