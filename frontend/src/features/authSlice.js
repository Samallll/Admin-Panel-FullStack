import { createSlice } from "@reduxjs/toolkit";
import request from "../services/api";
import { setAuthHeader } from "../services/api";

const initialState = {
    loggedUser: (() => {
      try {
        return JSON.parse(localStorage.getItem('logged_user') || '');
      } catch {
        return null;
      }
    })(),
    isLoading: false,
    error: null,
  };

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setLoggedUser:(state,action)=>{
            state.loggedUser = action.payload;
            state.isLoading = false;
            state.error = null;   
            localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));         
        },
        setError:(state,action)=>{
            state.error = action.payload;
            state.isLoading=false;
        },
        setIsLoading:(state,action)=>{
            state.error = null;
            state.isLoading = action.payload;
        },
        updateLoggedUser:(state,action)=>{
            state.loggedUser = {
                ...state.loggedUser,
                firstName: action.payload.firstName !== undefined ? action.payload.firstName : state.loggedUser.firstName,
                lastName: action.payload.lastName !== undefined ? action.payload.lastName : state.loggedUser.lastName,
                email: action.payload.email !== undefined ? action.payload.email : state.loggedUser.email,
              };
              state.isLoading = false;
              state.error = null;
              localStorage.setItem('logged_user', JSON.stringify(state.loggedUser));
        }
    }
})

export const { setError ,setLoggedUser ,setIsLoading,updateLoggedUser } = authSlice.actions;

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
                    response.data.user.role === 'ADMIN' ? navigate("/adminHome") : navigate("/userHome");
                }).catch((error)=>{
                    dispatch(setError(error.message))
                });
    }
}

export default authSlice.reducer;