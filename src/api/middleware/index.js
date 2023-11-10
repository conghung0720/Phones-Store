import { store } from "../../store";
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

 const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HOST,
    prepareHeaders: (headers) => {
        const {userInfo} = store.getState().reducer;
        
        headers.set('CLIENT_ID', userInfo?._id)
        headers.set('x-rtoken-id', localStorage.getItem('refresh_token'))
        headers.set('authorization', localStorage.getItem("access_token"))
        return headers
    },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    
    if(result.error?.status === 403 && result.error.data.message === "jwt expired"){
        const refreshResult = await baseQuery({
            url: 'user/handleRefreshToken',
            method: "POST"
        }, api, extraOptions)

        if(refreshResult.data){
            const {refreshToken, accessToken} = refreshResult.data.metadata.tokens
            localStorage.setItem('refresh_token', refreshToken)
            localStorage.setItem('access_token', accessToken)
            // store.dispatch(decodeUser())
        }
        else{
            console.log("Logout");
        }
    }
        return result;
}