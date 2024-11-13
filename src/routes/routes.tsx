import { PATH } from '@/constants/common';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { IRoute, IziRoute } from '@/lib/IziRoute';
import page from '@/pages';
import { JSX } from 'react/jsx-runtime';

export const withPrivate = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
    return <Component {...props} />;
};

const routes: IRoute[] = [
    {
        id: PATH.admin,
        path: '/admin',
        private: false,
        outsideLayout: true,
        element: MainLayout,
        children: [
            {
                id: PATH.dashboard,
                title: 'Dashboard',
                path: 'dashboard',
                private: true,
                element: page.admin.dashboard,
            },
        ],
    },
    {
        id: PATH.login,
        path: '/login',
        private: false,
        outsideLayout: true,
        element: AuthLayout,
        children: [
            {
                id: PATH.login,
                title: 'Login',
                path: '',
                private: false,
                element: page.public.login,
            },
        ],
    },

];

export const iziRoute = new IziRoute({
    routes,
    privateHOC: withPrivate,
});
