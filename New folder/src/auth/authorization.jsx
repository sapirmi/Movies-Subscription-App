import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import UnauthorizedComp from "./unauthorized";
import {useAuth} from "../auth/authProvider"

const Authorization = ({ permissions }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (user.username) {
        const userpermission = user.permissions;
        const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
        return isAllowed ? <Outlet /> : <UnauthorizedComp/>
    }
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};
export default Authorization;