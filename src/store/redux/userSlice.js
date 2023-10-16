import { createSlice, configureStore } from '@reduxjs/toolkit'
// import jwt from 'jsonwebtoken'
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";



const userToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

const initialState = {
  userInfo: decodeToken(userToken),
  userToken,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        const decoded = decodeToken(action.payload);
        state.userInfo = decoded
    },
    logout: state => {
      localStorage.removeItem('access_token')
      state.userInfo = null;
    }
  }
})

export const { setUser, logout } = userSlice.actions

const store = configureStore({
  reducer: userSlice.reducer
})

// Can still subscribe to the store
