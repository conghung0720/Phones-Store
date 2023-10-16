import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {  decodeToken } from "react-jwt";

//////
export const decodeUser = createAsyncThunk('jwt', async () => {
  try {
    const userToken = localStorage.getItem('access_token');
    if (userToken) {
      const decoded = await decodeToken(userToken)?.user;
      return decoded;
    }
    return null;
  } catch (error) {
    throw error;
  }
});




const initialState = {
  userInfo: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {

    },
    logout: state => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
      builder.addCase(decodeUser.fulfilled, (state, action) => {
          state.userInfo = action.payload
      })
  }
})

export const { setUser, logout } = userSlice.actions



// Can still subscribe to the store
