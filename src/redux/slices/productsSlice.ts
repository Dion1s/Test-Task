import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from '../../types/product';

// Define the API endpoint for managing products
const API_URL = 'http://localhost:3000/products';

// Initial state for the products slice
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching all products from the API
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk for adding a new product to the API
export const addProduct = createAsyncThunk<Product, Product>('products/addProduct', async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
});

// Async thunk for updating an existing product in the API
export const updateProduct = createAsyncThunk<Product, Product>('products/updateProduct', async (product) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  return response.data;
});

// Async thunk for deleting a product by its ID
export const deleteProduct = createAsyncThunk<number, number>('products/deleteProduct', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Create a slice for products with actions and reducers
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((product) => product.id !== action.payload);
      });
  },
});

// Selector to retrieve all products from the Redux store
export const selectAllProducts = (state: { products: ProductsState }) => state.products.items;

export default productsSlice.reducer;