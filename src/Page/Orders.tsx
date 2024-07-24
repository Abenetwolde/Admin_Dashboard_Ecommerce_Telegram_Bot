import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";


import { fetchProduct, fetchProductStart } from "../redux/productSlice";

// import { fetchOrder, fetchOrderStart } from "../redux/orderSlice";
import OrderTable from "../components/Order/OrderTable";
const OrdersPage = () => {


    return (
        <div className="">

            {/* <AdminSidebar /> */}
            <div className="mb-8  flex-col align-center justify-center mx-auto w-full">
                {/* <CreateNewProdcut /> */}


            </div>
            <div className="max-w-full overflow-x-auto">

                <OrderTable/>

            </div>
            <ToastContainer />
        </div>
    );
};

export default OrdersPage;