
import AdminSidebar from "../components/AdminSidebar";
// import TableHOC from "../components/TableHOC";
// import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Categorys = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <Link to="/categorys/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Categorys;