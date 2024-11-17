import { buttonVariants, Separator } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PATH } from '@/constants/common'
import { iziRoute } from '@/routes/routes'


const SettingLayout = () => {
    const { pathname } = useLocation()


    const sidebarNavItems = [
        {
            title: "Profile",
            href: iziRoute.getPathById(PATH.profile),
        },
        {
            title: "Appearance",
            href: iziRoute.getPathById(PATH.appearance),
        },
        {
            title: "Notifications",
            href: iziRoute.getPathById(PATH.notification),
        },
        {
            title: "Wallets",
            href: iziRoute.getPathById(PATH.wallet),
        },
    ]

    return (
        <div className="h-full flex-1 flex-col space-y-6 p-10 pb-16">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav
                        className={cn(
                            "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                        )}
                    >
                        {sidebarNavItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    pathname === item.href
                                        ? "bg-muted hover:bg-muted"
                                        : "hover:bg-transparent hover:underline",
                                    "justify-start"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SettingLayout
