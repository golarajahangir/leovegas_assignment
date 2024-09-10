import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './api/moviesApi';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    currentPage: 1,
    totalPages: 0,
    hasMore: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          state.movies = action.payload.results;
        } else {
          state.movies = [...state.movies, ...action.payload.results];
        }
        state.fetchStatus = 'success';
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasMore = action.payload.page < action.payload.total_pages;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice;
