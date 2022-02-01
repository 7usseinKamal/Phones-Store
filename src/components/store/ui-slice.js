import { createSlice } from "@reduxjs/toolkit";

const initialState = { showLoading: true, title: null, ModalOpen: false };

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    show(state, action) {
      state.showLoading = action.payload.value;
      state.title = action.payload.title;
    },
    openModal(state) {
      state.ModalOpen = true;
    },
    closeModal(state) {
      state.ModalOpen = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
