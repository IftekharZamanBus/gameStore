import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/common'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User', 'Game'],
    endpoints: (builder) => ({})
})