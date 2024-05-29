import { GAMES_URL } from '../constants/common';
import { apiSlice } from './apiSlice';

const token = JSON.parse(localStorage.getItem('user'))?.token;

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => ({
        url: GAMES_URL,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Game'],
    }),
    addGame: builder.mutation({
      query: (formData) => ({
        url: GAMES_URL,
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});

export const { useGetGamesQuery, useAddGameMutation } = gameApiSlice;
