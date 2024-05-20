import { GAMES_URL } from "../constants/common";
import { apiSlice } from "./apiSlice";

export const gameApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGames: builder.query({
            query: () => ({
                url: GAMES_URL
            }),
            providesTags: ['Game']
        })
    })
})

export const {useGetGamesQuery} = gameApiSlice;