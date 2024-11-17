import { PATH } from '@/constants/common';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { IRoute, IziRoute } from '@/lib/IziRoute';
import page from '@/pages';
import { withPrivate } from '@/routes/withPrivate';
import SettingLayout from '@/layouts/SettingLayout';

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
            {
                id: PATH.transaction,
                title: 'Transactions',
                path: 'transaction',
                private: true,
                element: page.admin.transaction,
            },
            {
                id: PATH.settings,
                path: 'settings',
                private: true,
                element: SettingLayout,
                children: [
                    {
                        id: PATH.profile,
                        title: 'Profile',
                        path: 'profile',
                        private: true,
                        element: page.admin.profile,
                    },
                    {
                        id: PATH.appearance,
                        title: 'Appearance',
                        path: 'appearance',
                        private: true,
                        element: page.admin.appearance,
                    },
                    {
                        id: PATH.notification,
                        title: 'Notification',
                        path: 'notification',
                        private: true,
                        element: page.admin.notification,
                    },
                    {
                        id: PATH.wallet,
                        title: 'Wallet',
                        path: 'wallet',
                        private: true,
                        element: page.admin.wallet,
                    },
                ],
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
