// src/redux/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { User } from '../Api/User';
// import User

interface UserState {
  page: number;
  rowsPerPage: number;
  totalPages: number;
  totalRows: number;
  performancePage: number;
  performanceRowsPerPage: number;
  performanceTotalPages: number;
  performanceTotalRows: number;
  clickpage:number,
  clickrowsPerPage:number,
  clicktotalPages:number,
  clicktotalRows:number,
  timepage:number,
  timerowsPerPage:number,
  timetotalPages:number,
 timetotalRows:number,
}

const initialState: UserState = {
  page: 0,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
  performancePage: 0,
  performanceRowsPerPage: 10,
  performanceTotalPages: 0,
  performanceTotalRows: 0,
  clickpage:0,
  clickrowsPerPage:10,
  clicktotalPages:0,
  clicktotalRows:0,
  timepage:0,
  timerowsPerPage:10,
  timetotalPages:0,
 timetotalRows:0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setPaginationData(state, action: PayloadAction<{ totalPages: number; totalRows: number }>) {
      state.totalPages = action.payload.totalPages;
      state.totalRows = action.payload.totalRows;
    },
    setPerformancePage(state, action: PayloadAction<number>) {
      state.performancePage = action.payload;
    },
    setPerformanceRowsPerPage(state, action: PayloadAction<number>) {
      state.performanceRowsPerPage = action.payload;
    },
    setPerformancePaginationData(state, action: PayloadAction<{ totalPages: number; totalRows: number }>) {
      state.performanceTotalPages = action.payload.totalPages;
      state.performanceTotalRows = action.payload.totalRows;
    },
    setPageClick(state, action: PayloadAction<number>) {
      state.clickpage = action.payload;
    },
    setRowsPerPageClick(state, action: PayloadAction<number>) {
      state.clickrowsPerPage = action.payload;
    },
    setPaginationDataClick(state, action: PayloadAction<{ totalPages: number; totalRows: number }>) {
      state.clicktotalPages = action.payload.totalPages;
      state.clicktotalRows = action.payload.totalRows;
    },
    setPageTime(state, action: PayloadAction<number>) {
      state.timepage = action.payload;
    },
    setRowsPerPageTime(state, action: PayloadAction<number>) {
      state.timerowsPerPage = action.payload;
    },
    setPaginationDataTime(state, action: PayloadAction<{ totalPages: number; totalRows: number }>) {
      state.timetotalPages = action.payload.totalPages;
      state.timetotalRows = action.payload.totalRows;
    },
  },
});

export const { setPage, setRowsPerPage, setPaginationData, setPerformancePage, setPerformanceRowsPerPage, setPerformancePaginationData,setPageClick,setPaginationDataClick,setRowsPerPageClick ,setPageTime,setRowsPerPageTime,setPaginationDataTime } = userSlice.actions;
export default userSlice.reducer;
