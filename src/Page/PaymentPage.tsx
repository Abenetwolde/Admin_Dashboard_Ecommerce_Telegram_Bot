import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import PaymentTable from "../components/Payment/PaymentTable";

const PaymentPage = () => {


    return (
        <div className="">

            {/* <AdminSidebar /> */}
            <div className="mb-8  flex-col align-center justify-center mx-auto w-full">
                {/* <CreateNewProdcut /> */}


            </div>
            <div className="max-w-full overflow-x-auto">
               <PaymentTable/>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PaymentPage;