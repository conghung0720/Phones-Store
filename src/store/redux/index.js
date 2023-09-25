import { createSlice, configureStore } from '@reduxjs/toolkit'
import jwt from 'jsonwebtoken'


const decodeJWT = async () => {
    const accessToken = localStorage.getItem('token') || ""
    const decoded = jwt.decode(accessToken, {complate: true})
    return decoded;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0
  },
  reducers: {
    getUser: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = userSlice.actions

const store = configureStore({
  reducer: userSlice.reducer
})

// Can still subscribe to the store
