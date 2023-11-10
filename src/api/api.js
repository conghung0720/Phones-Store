import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './middleware'



const HEADERS = {
  "x-rtoken-id": localStorage.getItem('refresh_token'),
  "authorization": localStorage.getItem("access_token")
}

export const userApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getListUser: builder.query({
      query: () => `user`,
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: (data) => `user/profileById/${data}`,
      providesTags: ['User']
    }),
    getProfile: builder.query({
      query: () => `user/profile`,
      providesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `user/edit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['User']
  }),
  })
})

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_HOST }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
      getListPhones: builder.query({
        query: () => `product/list`,
        providesTags: ['Product']
      }),
      getProductById: builder.query({
        query: ({idProduct}) => `product/${idProduct}`,
        providesTags: ['Product']
      }),
      getProductSubById: builder.mutation({
          query: (data) => ({
            url: `product/findSubProduct`,
            method: "POST",
            body: data,
          }),
          invalidatesTags: ['Product']
      }),
      updateProduct: builder.mutation({
        query: (data) => ({
          url: `product/updateProduct`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ['Product']
    }),
      newProduct: builder.mutation({
        query: (data) => ({
          url: `product`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['Product']
      }),
      deleteProduct: builder.mutation({
        query: (data) => ({
          url: `product/delete`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['Product']
      }),
      commentProduct: builder.mutation({
        query: (data) => ({
          url: `product/comment`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['Product']
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
            })
        }),
        login: builder.mutation({
          query: (data) => ({
              url: "auth/signin",
              method: "POST",
              body: data,
            })
      }),
        logout: builder.mutation({
          query: () => ({
              url: "auth/logout",
              method: "POST",
            })
      })
    })
})

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (data) => ({
                url: "cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Cart']
        }),
        updateItem: builder.mutation({
          query: (data) => ({
              url: "cart/update",
              method: "POST",
              body: data,
              headers: HEADERS
          }),
          invalidatesTags: ['Cart']
      }),
        getCart: builder.query({
          query: ({userId}) => `cart/findCart/${userId}`,
          providesTags: ['Cart']
        }),
        getCartUser: builder.query({
          query: () => `cart/findCart`,
          providesTags: ['Cart']
        }),
        newCart: builder.mutation({
          query: (data) => ({
            url: "cart/newCart",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ['Cart']
        })
    })
})

export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
    baseQuery: baseQueryWithReauth,
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

export const orderDetailApi = createApi({
  reducerPath: 'orderDetailApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['OrderDetail'],
    endpoints: (builder) => ({
      orderHistory: builder.mutation({
        query: (data) => ({
          url: "/orderDetail/history",
          method: "POST",
          body: data
        }),
      }),
      getOrderHistoryUser: builder.query({
        query: () => `/orderDetail/history`,
        providesTags: ['OrderDetail']
      }),
      getOrderDetailById: builder.query({
        query: (id) => `/orderDetail/${id}`,
        providesTags: ['OrderDetail']
      }),
      getAllOrder: builder.query({
        query: (id) => `/orderDetail/getAll`,
        providesTags: ['OrderDetail']
      }),
      cancelOrderDetail: builder.mutation({
        query: (data) => ({
          url: `/orderDetail/cancel`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['OrderDetail']
      }),
      deliveringOrderDetail: builder.mutation({
        query: (data) => ({
          url: `/orderDetail/delivering`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['OrderDetail']
      }),
      completedOrderDetail: builder.mutation({
        query: (data) => ({
          url: `/orderDetail/completed`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['OrderDetail']
      }),
      gettingItemOrderDetail: builder.mutation({
        query: (data) => ({
          url: `/orderDetail/getting_item`,
          method: "POST",
          body: data
        }),
        invalidatesTags: ['OrderDetail']
      }),
    })      
})



export const { useGetListUserQuery, useGetUserByIdQuery, useUpdateProfileMutation, useGetProfileQuery } = userApi
export const { useOrderHistoryMutation, useGetOrderHistoryUserQuery, 
  useCancelOrderDetailMutation, useCompletedOrderDetailMutation, useDeliveringOrderDetailMutation, 
  useGettingItemOrderDetailMutation, useGetOrderDetailByIdQuery, useGetAllOrderQuery } 
= orderDetailApi
export const { useCheckoutMutation } = checkoutApi
export const { useAddToCartMutation, useGetCartQuery, useUpdateItemMutation, useGetCartUserQuery, useNewCartMutation} = cartApi
export const { useRegisterMutation, useLoginMutation, useLogoutMutation} = authApi
export const { useGetListPhonesQuery, useGetProductByIdQuery, useGetProductSubByIdMutation, useUpdateProductMutation,
   useNewProductMutation, useDeleteProductMutation, useCommentProductMutation } = productsApi

