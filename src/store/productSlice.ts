import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductData } from '../utils/types';
import data from '../data/data.json';

interface ProductState {
  product: ProductData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProductData = createAsyncThunk(
  'product/fetchProductData',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data[0];
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export default productSlice.reducer;
