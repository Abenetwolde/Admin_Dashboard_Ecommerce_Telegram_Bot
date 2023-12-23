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
// import { themeSettings } from "theme";

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

        <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
          <Route index path="/" element={<Dashboard />} />
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/new" element={<NewProduct />} />
          <Route path="/categorys" element={<Categorys />} />
          <Route path="/categorys/new" element={<NewCategory />} />
        </Route>

    </Routes>
    </ThemeProvider>

  );
}

export default App;
