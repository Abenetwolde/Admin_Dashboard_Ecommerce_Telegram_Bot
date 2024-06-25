import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <NewCategoryForm />
      </Container>
      <div className="max-w-full overflow-x-auto">
        <CategoryTable />
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewCategory;
