import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import {  authApi, cartApi, checkoutApi, orderDetailApi, productsApi, userApi } from '../api/api'
import { decodeUser, userSlice } from './redux/userSlice'
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderDetailApi.reducerPath]: orderDetailApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    reducer: userSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, productsApi.middleware, authApi.middleware, cartApi.middleware, checkoutApi.middleware, orderDetailApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
store.dispatch(decodeUser());
setupListeners(store.dispatch)