import React from 'react'
import useAuthStore from '../store/store';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRouters = () => {
    const isSignedIn = useAuthStore(state => state.isSignedIn);
    return (
        <>
            {isSignedIn ? <Navigate to="/" /> : <Outlet />}
        </>
    )
}

export default PublicRouters