import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '../store';
import { AppThunk } from '../app/store';

import { getUserList } from '../services/users';

interface User {
    _id: string;
    telegramid: string,
    first_name: string;
    last_name: string;
    username: string;
    language:string,
    is_bot: string

}

interface CategoryState {
    data: User[];
    loading: boolean;
    error: string | null;
    page: number;
    rowsPerPage: number;
    totalPages: number;
    totalRows: number;
}

const initialState: CategoryState = {
    data: [],
    loading: false,
    error: null,
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalRows: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        createUserSuccess(state, action: PayloadAction<User>) {
            state.data.unshift(action.payload);
            state.totalRows += 1;
        },
        fetchUserSuccess(state, action: PayloadAction<{ users: User[]; count: number; page: number; pageSize: number; totalPages: number }>) {
            state.loading = false;
            state.data = action.payload.users;
            state.totalRows = action.payload.count;
            state.page = action.payload.page;
            state.rowsPerPage = action.payload.pageSize;
            state.totalPages = action.payload.totalPages;
        },
        updateUserSuccess(state, action: PayloadAction<User>) {
            const updateduser = action.payload;
            const index = state.data.findIndex((user) => user.telegramid === updateduser.telegramid);

            if (index !== -1) {
                state.data[index] = updateduser;
            }
        },
        deleteUserSuccess(state, action: PayloadAction<string>) {
            // const deletedCategoryId = action.payload;
            const index = state.data.findIndex((category) => category.telegramid === action.payload);

            // Remove the category from the array
            if (index !== -1) {
                state.data.splice(index, 1);
            }

            // Decrement the totalRows count
            state.totalRows -= 1;
        },

        fetchUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setRowsPerPage(state, action: PayloadAction<number>) {
            state.rowsPerPage = action.payload;
        },
    },
});

export const {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure,
    updateUserSuccess,
    deleteUserSuccess,
    createUserSuccess,
    setPage,
    setRowsPerPage,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
    const { page, rowsPerPage } = getState().user;
    dispatch(fetchUserStart());
    try {
        const users = await getUserList(page, rowsPerPage);
        console.log("Usersssssssss..........",users)
        dispatch(fetchUserSuccess({ ...users, page, pageSize: rowsPerPage }));
    } catch (error) {
        dispatch(fetchUserFailure('Failed to fetch categories'));
    }
};

export const setRowsPerPageAndFetch = (newRowsPerPage: number): AppThunk => async (dispatch) => {
    dispatch(setRowsPerPage(newRowsPerPage));
    dispatch(setPage(0));
    dispatch(fetchUsers());
};

export const setPageAndFetch = (newPage: number): AppThunk => async (dispatch) => {
    dispatch(setPage(newPage));
    dispatch(fetchUsers());
};
