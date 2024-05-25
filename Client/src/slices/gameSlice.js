import { GAMES_URL } from "../constants/common";
import { apiSlice } from "./apiSlice";

export const addGame = createAsyncThunk('games/addGame', async (gameData) => {
  try {
    const response = await post(GAMES_URL, gameData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const gameApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => ({
                url: GAMES_URL
            }),
            providesTags: ['Game']
        }),
        addGame: builder.mutation({
            query: (gameData) => ({
                url: GAMES_URL,
                method: 'POST',
                body: gameData
            })
        })
    })
})

export const { useAddGameMutation, useGetGamesQuery } = gameApiSlice;
