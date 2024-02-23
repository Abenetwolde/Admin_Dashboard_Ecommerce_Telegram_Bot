import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";


import UserTable from "../components/User/UserTable";
import { fetchUserStart, fetchUsers } from "../redux/userSlice";
fetchUsers
const UserPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserStart())
    //@ts-ignore
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="">

      {/* <AdminSidebar /> */}
      <div className="mb-8  flex-col align-center justify-center mx-auto w-full">
      </div>
      <div className="max-w-full  overflow-x-auto">

        <UserTable />

      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPage;