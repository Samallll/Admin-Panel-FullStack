import { createSlice } from "@reduxjs/toolkit";
import request from "../services/api";
import { setAuthHeader } from "../services/api";

const initialState = {
    loggedUser:null,
    isLoading:false,
    error:null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setLoggedUser:(state,action)=>{
            state.loggedUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError:(state,action)=>{
            state.error = action.payload;
            state.isLoading=false;
        },
        setIsLoading:(state,action)=>{
            state.error = null;
            state.isLoading = action.payload;
        }
    }
})

export const { setError ,setLoggedUser ,setIsLoading } = authSlice.actions;

//this is an action creator for thunk function, it will return a thunk function
export const loginUser = (credentials,navigate) => {
    // return thunk functin (dispatch,getState) - common structure
    return async (dispatch) => {
                setAuthHeader(null);
                dispatch(setIsLoading(true));
                request(
                    "POST",
                    "/common/authenticate",
                    credentials,
                ).then((response)=>{
                    dispatch(setIsLoading(true))
                    dispatch(setLoggedUser(response.data.user));
                    setAuthHeader(response.data.token);
                    dispatch(setIsLoading(false))
                    navigate("/")
                }).catch((error)=>{
                    dispatch(setError(error.message))
                });
    }
}

export default authSlice.reducer;