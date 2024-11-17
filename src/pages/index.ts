import loadable from "@loadable/component";

export default {
    admin: {
        dashboard: loadable(() => import("./admin/dashboard/page")),
        profile: loadable(() => import("./admin/profile/page")),
        appearance: loadable(() => import("./admin/appearance/page")),
        notification: loadable(() => import("./admin/notification/page")),
        wallet: loadable(() => import("./admin/wallet/page")),
        transaction: loadable(() => import("./admin/transaction/page")),
    },
    public: {
        login: loadable(() => import("./public/sign-in/page")),
        signup: loadable(() => import("./public/sign-up/page")),
        forgot: loadable(() => import("./public/forgot-password/page")),
        resetPassword: loadable(() => import("./public/reset-password/page")),
    },
};
