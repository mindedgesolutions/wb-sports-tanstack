import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null as UserProps | null,
  counter: 0,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
    updateCounter: (state) => {
      state.counter += 1;
    },
  },
});
export const { setUser, unsetUser, updateCounter } = commonSlice.actions;
export default commonSlice.reducer;
