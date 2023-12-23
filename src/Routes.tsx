// src/components/Routes.tsx
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';
import { RootState } from './app/store';


const ProtectedRoute = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    console.log(".........user",user)
const {role,token}=user
console.log("alowed",allowedRoles)
    const location = useLocation();
    const allowroute = allowedRoles.includes(role)
    
    console.log(allowroute)
    return (
        allowroute
            ? <Outlet />
            : token
                ? <Navigate to="/dashboard" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute;
