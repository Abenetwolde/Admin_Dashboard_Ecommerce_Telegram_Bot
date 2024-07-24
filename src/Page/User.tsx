import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";


import UserTable from "../components/User/UserTable";
// import { fetchUserStart, fetchUsers } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, useTheme } from "@mui/material";
import UserPerformance from "../components/Dashboard/USerPerformance";
import api from "../services/api";
import AddUserDialog from "../components/User/CreateUser";
import { useGetUserPerformanceQuery } from "../redux/Api/User";
import { setPerformancePage, setPerformancePaginationData, setPerformanceRowsPerPage } from "../redux/userSlice";

import { RootState } from "@reduxjs/toolkit/query";
import UserClickTable from "../components/Dashboard/UserClickTable";
import UserClicksTable from "../components/User/UserClicksTable";
import UserTimesTable from "../components/User/UserTimesTable";
// fetchUsers
const UserPage = () => {

  const [filterUserPerformanceTable, setFilterUserPerformance] = useState('perMonth');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();
  const theme = useTheme()
  const dispatch = useDispatch();
  // const handleFilterUserPerformanceTable = (newFilter) => {
  //   setFilterUserPerformance(newFilter);

  // };
  const [isOpen, setIsOpen] = useState(false);
  const { path } = useParams();
  const performanceSectionRef = useRef(null);
  const searchDebounceRef = useRef(null);
  const { performancePage, performanceRowsPerPage } = useSelector((state: RootState) => state.user);

  // const [filterUserPerformanceTable, setFilterUserPerformance] = useState('perMonth');
  // const [search, setSearch] = useState('');
  const { data: userPerformanceData, isLoading: loadingUserPerformance, refetch } = useGetUserPerformanceQuery({
    page: performancePage + 1,
    limit: performanceRowsPerPage,
    search,
    interval: filterUserPerformanceTable,
  });

  const debounce = (func, delay) => {
    return (...args) => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
      searchDebounceRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
    dispatch(setPerformancePage(0)); // Reset to first page on new search
    refetch({ page: 1, limit: performanceRowsPerPage, search: e.target.value, interval: filterUserPerformanceTable });
  }, 500);

  const handlePageChange = (number) => {
    dispatch(setPerformancePage(number));
    refetch({ page: number + 1, limit: performanceRowsPerPage, search, interval: filterUserPerformanceTable });
  };

  const handleRowsPerPageChange = (number) => {
    dispatch(setPerformanceRowsPerPage(number.target.value));
    dispatch(setPerformancePage(0)); // Reset to first page on new limit
    refetch({ page: 1, limit: number.target.value, search, interval: filterUserPerformanceTable });
  };

  const handleFilterUserPerformanceTable = (newFilter) => {
    setFilterUserPerformance(newFilter);
    dispatch(setPerformancePage(0)); // Reset to first page on new filter
    refetch({ page: 1, limit: performanceRowsPerPage, search, interval: newFilter });
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (path === 'performance') {
      scrollToSection(performanceSectionRef);
    }
  }, [path]);

  useEffect(() => {
    if (userPerformanceData) {
      dispatch(setPerformancePaginationData({
        totalPages: userPerformanceData.totalPages,
        totalRows: userPerformanceData.totalRows,
      }));
    }
  }, [userPerformanceData, dispatch]);
  // useEffect(() => {
  //   if (path === 'performance') {
  //     scrollToSection(performanceSectionRef);
  //   }
  // }, [path]);

  const isFalse: boolean = path ? true : false

  return (
    <>
      <div className="max-w-full flex flex-col flex-end overflow-x-auto">
        <Box width={'100%'} display={'felx'} justifyContent={'flex-end'} alignItems={'center'}>
          <Button
            size="small"
            variant="contained"
            // color={theme.palette.info.light}
            onClick={() => setIsOpen(true)}
            style={{ backgroundColor: theme.palette.info.main, border: 'none', outline: "none", float: 'right', marginBottom: '1rem', padding: "0.5rem", width: '100px' }}
          >
            + Add User
          </Button>
        </Box>

        <UserTable />
        <UserClicksTable />
        <UserTimesTable />
        <Grid item xs={12} md={8} lg={8} width="100%" textAlign="center">
          <div ref={performanceSectionRef}>

            <UserPerformance data={userPerformanceData} loading={loadingUserPerformance} filterUserPerformanceTable={filterUserPerformanceTable} handleFilterUserPerformanceTable={handleFilterUserPerformanceTable} handelSearch={handleSearch} handelLimit={handleRowsPerPageChange} handelPage={handlePageChange} isFalse={isFalse} />
          </div>

        </Grid>
      </div>
      <AddUserDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <ToastContainer />
    </>
  );
};

export default UserPage;