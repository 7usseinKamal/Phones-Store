import { createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  inCartItems: [],
  modalItem: {},
  changed: false,
};

const removeItem = (state, id) => {
  return state.filter((item) => item.id !== id);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setData(state, action) {
      state.items.push(...action.payload);
    },
    replaceCart(state, action) {
      state.inCartItems = action.payload;
    },
    putData(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.inCart = true;
        item.count++;
        item.total = item.count * item.price;
      }
      state.changed = true;
      state.inCartItems.push(item);
      state.modalItem = item;
    },
    plusItem(state, action) {
      const item = state.inCartItems.find((item) => item.id === action.payload);
      state.changed = true;
      item.count++;
      item.total = item.count * item.price;
    },
    minusItem(state, action) {
      const item = state.inCartItems.find((item) => item.id === action.payload);
      const inCartItem = state.items.find((item) => item.id === action.payload);
      if (item.count <= 1) {
        inCartItem.inCart = false;
        state.inCartItems = removeItem(state.inCartItems, action.payload);
      }
      state.changed = true;
      item.count--;
      item.total = item.count * item.price;
    },
    deleteItem(state, action) {
      const inCartItem = state.items.find((item) => item.id === action.payload);
      state.changed = true;
      inCartItem.inCart = false;
      inCartItem.count = 0;
      state.inCartItems = removeItem(state.inCartItems, action.payload);
    },
    clearCart(state) {
      state.changed = true;
      for (let i = 0; i < state.items.length; i++) {
        state.items[i].count = 0;
        state.items[i].inCart = false;
        state.items[i].total = 0;
      }
      state.inCartItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
