import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const phonesApi = createApi({
    reducerPath: 'phonesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/' }),
    endpoints: (builder) => ({
      getListPhones: builder.query({
        query: () => `product/list`,
      }),
      getProductById: builder.query({
        query: ({idProduct}) => `product/${idProduct}`
      })
    }),
  })
  

export const { useGetListPhonesQuery, useGetProductByIdQuery } = phonesApi

