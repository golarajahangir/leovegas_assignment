import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const errorMsg =
      response.status === 404 ? 'Movies not found' : 'Failed to fetch movies';
    throw new Error(errorMsg);
  }
  return response.json();
});
