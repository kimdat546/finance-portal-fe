import { buttonVariants } from "@/components/ui";
import { PATH } from "@/constants/common";
import { cn } from "@/lib/utils";
import { iziRoute } from "@/routes/routes";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
    const { pathname } = useLocation();
    const isLogin = iziRoute.isMatchPath(
        iziRoute.getPathById(PATH.login),
        pathname
    );
    const { RiveComponent } = useRive({
        src: "/jungle_drive.riv",
        stateMachines: "Drive machine",
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.TopCenter,
        }),
    });

    return (
        <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                to={
                    isLogin
                        ? iziRoute.getPathById(PATH.signup)
                        : iziRoute.getPathById(PATH.login)
                }
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                {isLogin ? "Sign up" : "Login"}
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <RiveComponent className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium py-1 px-2 rounded-lg bg-zinc-900 w-fit select-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Acme Inc
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg py-1 px-2 rounded-lg bg-zinc-900 w-fit select-none">
                            &ldquo;This library has saved me countless hours of
                            work and helped me deliver stunning designs to my
                            clients faster than ever before.&rdquo;
                        </p>
                        <footer className="text-sm py-1 px-2 rounded-lg bg-zinc-900 w-fit select-none">
                            Sofia Davis
                        </footer>
                    </blockquote>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
