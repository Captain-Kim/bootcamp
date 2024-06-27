import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../components/api/api';
import { Navigate, Outlet } from 'react-router-dom';
import checkSignIn from '../components/authentication/checkSignIn';

export const AdminRouters = () => {
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserData() {
            try {
                const isSignedIn = await checkSignIn();
                if (isSignedIn) {
                    const userData = await getCurrentUser();
                    setCurrentUserInfo(userData.email);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        }

        getUserData();
    }, []);

    if (loading) {
        return null;
    }

    return <>{currentUserInfo === 'admin@admin.admin' ? <Outlet /> : <Navigate to="/" />}</>;
};