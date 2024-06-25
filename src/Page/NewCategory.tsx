import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { fetchCategories, fetchCategoriesStart } from "../redux/categorySlice";
import NewCategoryForm from "../components/NewCategory";
import CategoryTable from "../components/CategoryTable";
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  marginBottom: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  width: '100%',
  maxWidth: '100%',
});

const NewCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
=======


import NewCategoryForm from "../components/NewCategory";
import CategoryTable from "../components/CategoryTable";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchCategoriesStart } from "../redux/categorySlice";
const NewCategory = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart())
    //@ts-ignore
>>>>>>> origin/main
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
<<<<<<< HEAD
    <div>
      <Container>
        <NewCategoryForm />
      </Container>
      <div className="max-w-full overflow-x-auto">
        <CategoryTable />
      </div>
=======
    <div className="">

      {/* <AdminSidebar /> */}
      <div  className="mb-8  flex-col align-center justify-center mx-auto w-full">
        <NewCategoryForm />

   
      </div>
      <div className="max-w-full  overflow-x-auto">
     
     <CategoryTable />

   </div>
>>>>>>> origin/main
      <ToastContainer />
    </div>
  );
};

<<<<<<< HEAD
export default NewCategory;
=======
export default NewCategory;
>>>>>>> origin/main
