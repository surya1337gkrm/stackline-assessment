import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/productSlice.ts';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;