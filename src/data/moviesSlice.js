import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
    currentPage: 1,
    totalPages: 0,
    hasMore: true,
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
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error';
      });
  },
});

export default moviesSlice;
