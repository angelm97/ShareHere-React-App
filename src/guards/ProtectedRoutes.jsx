import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Login } from '../components';
import Home from '../container/Home';


const useAuth = () => {
    const user = localStorage.getItem('user');
    return !!user;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Home /> : <Navigate to='/login' />;
}

export default ProtectedRoutes
