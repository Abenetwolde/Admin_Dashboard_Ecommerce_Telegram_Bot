// src/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string,
    user: {
        id: string | null;
        email: string | null;
        token: string | null;
        refershToken: string | null;
        role: string | null;
        // Add more user-related fields as needed
    };
}
const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
const initialState: AuthState = {
    token: JSON.parse(localStorage.getItem('token')),
    user: storedUser && storedUser || {
        id: null,
        email: null,
        refershToken: null
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            localStorage.setItem('token', JSON.stringify(action.payload));
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = { ...action.payload };
            localStorage.setItem('user', JSON.stringify(action.payload))

        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    },
});

export const { setToken, setUser,logOut } = authSlice.actions;
export default authSlice.reducer;