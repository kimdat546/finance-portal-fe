import { PATH } from '@/constants/common';
import { iziRoute } from "@/routes/routes";
import { useAuthStore } from '@/store/authStore';
import { LoadableComponent } from '@loadable/component';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const withPrivate = (Component: React.FC | LoadableComponent<unknown>) => (props: JSX.IntrinsicAttributes) => {
    const isAuthenticated = useAuthStore((state) => !!state.accessToken);

    return isAuthenticated ? <Component {...props} /> : <Navigate to={iziRoute.getPathById(PATH.login)} />;
};
