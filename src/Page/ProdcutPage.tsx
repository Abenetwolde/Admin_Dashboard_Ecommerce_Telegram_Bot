import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import CreateNewProdcut from "../components/Prodcut/CreateNewProdcut";
import { fetchProduct, fetchProductStart } from "../redux/productSlice";
import ProdcutTable from "../components/Prodcut/ProdcutTable";
const ProdcutPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductStart())
    //@ts-ignore
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="">

      {/* <AdminSidebar /> */}
<<<<<<< HEAD
      <div className="mb-8  flex-col align-center justify-center mx-auto w-full">
        <CreateNewProdcut />


      </div>
      <div className="max-w-full  overflow-x-auto">

        <ProdcutTable />

      </div>
=======
      <div  className="mb-8  flex-col align-center justify-center mx-auto w-full">
 <CreateNewProdcut/>

   
      </div>
      <div className="max-w-full  overflow-x-auto">
     
     <ProdcutTable/>

   </div>
>>>>>>> origin/main
      <ToastContainer />
    </div>
  );
};

export default ProdcutPage;