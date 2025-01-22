import React from "react";
import { Navigate } from "react-router-dom";
import { ROLES } from "./authRole";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children, allowedRoles, userRole }) => {
    const { isAuthenticated, user } = useAuth();
    
    // Check authentication first
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    // Then check authorization
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
};

export default ProtectedRoute;