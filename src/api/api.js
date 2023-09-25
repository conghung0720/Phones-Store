import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_HOST }),
    endpoints: (builder) => ({
      getListPhones: builder.query({
        query: () => `product/list`,
      }),
      getProductById: builder.query({
        query: ({idProduct}) => `product/${idProduct}`
      })
    }),
  })
  
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_HOST
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "auth/signup",
                method: "POST",
                body: data,
                headers: {"CLIENT_ID": "Test"}
            })
        })
    })
})

export const { useRegisterMutation} = authApi
export const { useGetListPhonesQuery, useGetProductByIdQuery } = productsApi

