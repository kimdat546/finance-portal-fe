import WalletSwitcher from "@/components/others/WalletSwitcher";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    Input,
} from "@/components/ui";
import { PATH } from "@/constants/common";
import { groupsWallet } from "@/data";
import { useLogout } from "@/hooks/useAuth";
import { iziRoute } from "@/routes/routes";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
    const navigate = useNavigate();
    const { mutate: logout, isPending } = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate(iziRoute.getPathById(PATH.login));
    };

    return (
        <div className="relative flex flex-col min-h-screen w-full">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <WalletSwitcher groups={groupsWallet} />
                    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
                        <Link
                            to={iziRoute.getPathById(PATH.dashboard)}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to={iziRoute.getPathById(PATH.transaction)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Transactions
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Products
                        </Link>
                        <Link
                            to={iziRoute.getPathById(PATH.profile)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Settings
                        </Link>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <div>
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="md:w-[100px] lg:w-[300px]"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src="https://picsum.photos/200?random=1"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Dat Nguyen
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            kimdat546@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>
                                            ⇧⌘P
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>
                                            ⌘B
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            navigate(
                                                iziRoute.getPathById(
                                                    PATH.profile
                                                )
                                            )
                                        }
                                    >
                                        Settings
                                        <DropdownMenuShortcut>
                                            ⌘S
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        New Account
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    disabled={isPending}
                                >
                                    Log out
                                    <DropdownMenuShortcut>
                                        ⇧⌘Q
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
