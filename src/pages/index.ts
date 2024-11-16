import loadable from "@loadable/component";

export default {
    admin: {
        dashboard: loadable(() => import("./admin/dashboard/page")),
    },
    public: {
        login: loadable(() => import("./public/sign-in/page")),
        signup: loadable(() => import("./public/sign-up/page")),
        forgot: loadable(() => import("./public/forgot-password/page")),
        resetPassword: loadable(() => import("./public/reset-password/page")),
    },
};
