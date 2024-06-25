// src/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    
    user: {
      id: string | null;
      email: string | null;
      token: string | null;
      role: string | null;
      // Add more user-related fields as needed
    };
  }
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
const initialState: AuthState = {
    user:  storedUser&&storedUser || {
        id: null,
        email: null,
        token:null,
        role:null
        // Initialize other user-related fields as needed
      },
}; 

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.user.token = action.payload;
    },
    setUser: (state, action: PayloadAction<{ id: string | null; email: string | null ;token:string | null,role:string | null}>) => {
        state.user = { ...action.payload };
       console.log("user from state",state.user)
      },
  },
});

export const { setToken ,setUser} = authSlice.actions;
export default authSlice.reducer;