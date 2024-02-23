import {  useEffect} from "react";
import { Routes, Route,  useNavigate } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

import { RootState } from "./app/store";
import ProtectedRoute from "./Routes";


import NewCategory from "./Page/NewCategory";

// import { themeSettings } from "theme";
import AdminLayout from "./Layout/Admin";
import ProdcutPage from "./Page/ProdcutPage";
import UserPage from "./Page/User";
import OrdersPage from "./Page/Orders";
import PaymentPage from "./Page/PaymentPage";
import Dashboard from "./Page/Dashboard";
// themeSett
function App() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.user.token);
  console.log("here is a token", token)
  useEffect(() => {
    if (token !== null) return
    navigate("/");


  }, [token]);


  // Navigate to the dashboard page when the application loads
  useEffect(() => {
    navigate('/admin/dashboard', { replace: true });
  }, []);

  // const mode = useSelector((state) => state.global.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />

      <Routes>

        <Route path="/login" element={<Login />} />
        {/* <PrivateRoute
          path="/admin"
          component={props => <AdminLayout {...props} />}
        /> */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
          <Route path="/*" element={<AdminLayout />}>
          <Route  path="admin/dashboard" element={<Dashboard/>} />
          <Route path="admin/category" element={<NewCategory />} />
          <Route path="admin/product" element={<ProdcutPage />} />
          <Route path="admin/user" element={<UserPage />} />
          <Route path="admin/orders" element={<OrdersPage />} />
          <Route path="admin/payment" element={<PaymentPage />} />

        </Route>
        </Route>
      </Routes>


  );
}

export default App;
