import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import commentsReducer from './slices/commentsSlice';

// Configure the Redux store with slices
const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

// Type alias for the root state of the Redux store
// This infers the entire state structure based on the reducers provided
export type RootState = ReturnType<typeof store.getState>;

// Type alias for the app's dispatch function
// This ensures that dispatch works correctly with Redux Thunks and actions
export type AppDispatch = typeof store.dispatch;

export default store;
