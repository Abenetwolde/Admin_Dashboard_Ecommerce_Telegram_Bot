import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

import { RootState } from "./app/store";
import ProtectedRoute from "./Routes";
import Dashboard from "./Page/dashboard";
import Products from "./Page/Product";
import NewProduct from "./Page/NewProduct";
import Categorys from "./Page/Categorys";
import NewCategory from "./Page/NewCategory";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { PrivateRoute } from "./Page/PrivateRoute";
// import { themeSettings } from "theme";
import AdminLayout from "./Layout/Admin";
import Test from "./Page/Test";
import Category from "./Page/Category";
// themeSett
function App() {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.user.token);
  console.log("here is a token", token)
  useEffect(() => {
    if (token !== null) return
    navigate("/");


  }, [token]);

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>

        <Route path="/login" element={<Login />} />
        {/* <PrivateRoute
          path="/admin"
          component={props => <AdminLayout {...props} />}
        /> */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
          <Route path="/*" element={<AdminLayout />}>
          <Route index element={<NewProduct />} />
          <Route path="admin/dashboard" element={<NewProduct />} />
          <Route path="admin/test" element={<Category />} />
          <Route path="categorys" element={<Categorys />} />
          <Route path="categorys/new" element={<NewCategory />} />
        </Route>
        </Route>
      </Routes>

      {/* <Navigate from="/" to="/admin/dashboard" /> */}
    </ThemeProvider>

  );
}

export default App;
