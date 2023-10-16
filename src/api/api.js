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
      }),
      getProductSubById: builder.mutation({
          query: (data) => ({
            url: `product/findSubProduct`,
            method: "POST",
            body: data,
          })
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
        }),
        login: builder.mutation({
          query: (data) => ({
              url: "auth/signin",
              method: "POST",
              body: data,
              headers: {"CLIENT_ID": "Test"}
          })
      })
    })
})

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_HOST
    }),
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (data) => ({
                url: "cart",
                method: "POST",
                body: data,
                headers: {"CLIENT_ID": "Test"}
            })
        }),
        updateItem: builder.mutation({
          query: (data) => ({
              url: "cart/update",
              method: "POST",
              body: data,
              headers: {"CLIENT_ID": "Test"}
          })
      }),
        getCart: builder.query({
          query: ({userId}) => `cart/findCart/${userId}`,
        }),
        
    })
})

export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
      baseQuery: fetchBaseQuery({
          baseUrl: process.env.REACT_APP_HOST
      }),
      endpoints: (builder) => ({
        checkout: builder.mutation({
          query: (data) => ({
            url: "/checkout",
            method: "POST",
            body: data
          })
        })
      })      
})

export const orderHistoryApi = createApi({
  reducerPath: 'orderHistoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_HOST
    }),
    endpoints: (builder) => ({
      orderHistory: builder.mutation({
        query: (data) => ({
          url: "/order-history",
          method: "POST",
          body: data
        }),
      }),
      getOrderHistoryUser: builder.query({
        query: ({userId}) => `/order-history/${userId}`
      })
    })      
})


export const { useOrderHistoryMutation, useGetOrderHistoryUserQuery } = orderHistoryApi
export const { useCheckoutMutation } = checkoutApi
export const { useAddToCartMutation, useGetCartQuery, useUpdateItemMutation} = cartApi
export const { useRegisterMutation, useLoginMutation} = authApi
export const { useGetListPhonesQuery, useGetProductByIdQuery, useGetProductSubByIdMutation } = productsApi

