import { PATH } from '@/constants/common';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { IRoute, IziRoute } from '@/lib/IziRoute';
import page from '@/pages';
import { withPrivate } from '@/routes/withPrivate';

const routes: IRoute[] = [
    {
        id: PATH.admin,
        path: '/admin',
        private: true,
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
        id: PATH.auth,
        path: '/auth',
        private: false,
        outsideLayout: true,
        element: AuthLayout,
        children: [
            {
                id: PATH.login,
                title: 'Login',
                path: 'login',
                private: false,
                element: page.public.login,
            },
            {
                id: PATH.signup,
                title: 'Signup',
                path: 'signup',
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
