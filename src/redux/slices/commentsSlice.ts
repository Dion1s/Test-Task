import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Comment, CommentsState } from '../../types/comment'; // Import Comment and CommentsState interfaces

// Define the API endpoint for fetching comments
const API_URL = 'http://localhost:3000/comments';

// Initial state for the comments slice
const initialState: CommentsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching all comments from the API
export const fetchComments = createAsyncThunk<Comment[]>('comments/fetchComments', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk for adding a new comment to the API
export const addComment = createAsyncThunk<Comment, Comment>('comments/addComment', async (comment) => {
  const response = await axios.post(API_URL, comment);
  return response.data;
});

// Async thunk for deleting a comment by its ID
export const deleteComment = createAsyncThunk<number, number>('comments/deleteComment', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Create a slice for comments with actions and reducers
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((comment) => comment.id !== action.payload);
      });
  },
});

// Selector for filtering comments by productId
export const selectCommentsByProduct = (state: { comments: CommentsState }, productId: number) =>
  state.comments.items.filter((comment) => comment.productId === productId);

export default commentsSlice.reducer;
