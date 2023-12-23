import { useState, ChangeEvent, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../components/AdminSidebar";

import NewCategoryForm from "../components/NewCategory";
import CategoryTable from "../components/CategoryTable";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchCategoriesStart } from "../redux/categorySlice";
const NewCategory = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart())
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="admin-container">

      <AdminSidebar />
      <div className=" mx-auto my-8 p-4">
        <NewCategoryForm />

        <div className="max-w-full overflow-x-auto">
          <CategoryTable />

        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default NewCategory;