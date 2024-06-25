<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
=======
import { useEffect } from "react";
>>>>>>> origin/main
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";


import UserTable from "../components/User/UserTable";
import { fetchUserStart, fetchUsers } from "../redux/userSlice";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import UserPerformance from "../components/Dashboard/USerPerformance";
import api from "../services/api";
fetchUsers
const UserPage = () => {
  const [userperformance, setDataUserperformance] = useState<any[]>([]);
  const [loadingUserPerformance, setLoadingUserPerformance] = useState(true);
  const [filterUserPerformanceTable, setFilterUserPerformance] = useState('perMonth');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const dispatch = useDispatch();
  const handleFilterUserPerformanceTable = (newFilter) => {
    setFilterUserPerformance(newFilter);

  };
  const { path } = useParams();
  const performanceSectionRef = useRef(null);
  const searchDebounceRef = useRef(null);
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
    setPage(1);
    setSearch(e.target.value);
  }, 500);

  const handelPage = (_e:unknown, number: any) => {
    console.log("page ch log......",number)
    setPage(number);

  };
  const handelLimit = (number: any) => {
   console.log("limit log",number?.target.value)
    setLimit(number?.target.value);
     setPage(1);

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
=======
fetchUsers
const UserPage = () => {

  const dispatch = useDispatch();

>>>>>>> origin/main
  useEffect(() => {
    dispatch(fetchUserStart())
    //@ts-ignore
    dispatch(fetchUsers());
  }, [dispatch]);

<<<<<<< HEAD
  useEffect(() => {
    setLoadingUserPerformance(true);
    // Fetch data from the API
    api.get(`/kpi/get-users-performance?interval=${filterUserPerformanceTable}&search=${search}&limit=${limit}&page=${page}`) // Replace with your actual API endpoint
      .then(response => {
        setDataUserperformance(response.data);
        setLoadingUserPerformance(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoadingUserPerformance(false);
      });
  }, [filterUserPerformanceTable,search,page,limit]);


  const isFalse: boolean = path ? true : false

=======
>>>>>>> origin/main
  return (
    <div className="">

      {/* <AdminSidebar /> */}
      <div className="mb-8  flex-col align-center justify-center mx-auto w-full">
      </div>
      <div className="max-w-full  overflow-x-auto">
<<<<<<< HEAD
   
        <UserTable />
        <Grid item xs={12} md={8} lg={8} width="100%" textAlign="center">
        <div ref={performanceSectionRef}>

<UserPerformance data={userperformance} loading={loadingUserPerformance} filterUserPerformanceTable={filterUserPerformanceTable} handleFilterUserPerformanceTable={handleFilterUserPerformanceTable} handelSearch={handleSearch} handelLimit={handelLimit} handelPage={handelPage} isFalse={isFalse} />
</div>
          
        </Grid>
=======

        <UserTable />

>>>>>>> origin/main
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPage;