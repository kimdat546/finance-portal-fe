import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import * as React from "react";
import { GroupWallet } from "@/types/common";
import { Wallet } from "@/types/entities";
import { cn } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface WalletSwitcherProps extends PopoverTriggerProps {
    className?: string;
    groups: GroupWallet[];
}

export default function WalletSwitcher({
    className,
    groups,
}: WalletSwitcherProps) {
    const [open, setOpen] = React.useState(false);
    const [showNewWalletDialog, setShowNewWalletDialog] = React.useState(false);
    const [selectedWallet, setSelectedWallet] = React.useState<Wallet>(
        groups?.[0]?.wallets?.[0]
    );

    return (
        <Dialog
            open={showNewWalletDialog}
            onOpenChange={setShowNewWalletDialog}
        >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a wallet"
                        className={cn("w-[200px] justify-between", className)}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src="https://picsum.photos/200"
                                alt={selectedWallet.name}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedWallet.name}
                        <ChevronsUpDown className="ml-auto opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search wallet..." />
                        <CommandList>
                            <CommandEmpty>No wallet found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup
                                    key={group.label}
                                    heading={group.label}
                                >
                                    {group.wallets.map((wallet) => (
                                        <CommandItem
                                            key={wallet.id}
                                            onSelect={() => {
                                                setSelectedWallet(wallet);
                                                setOpen(false);
                                            }}
                                            className="text-sm"
                                        >
                                            <Avatar className="mr-2 h-5 w-5">
                                                <AvatarImage
                                                    src="https://picsum.photos/200"
                                                    alt={wallet.name}
                                                    className="grayscale"
                                                />
                                                <AvatarFallback>
                                                    SC
                                                </AvatarFallback>
                                            </Avatar>
                                            {wallet.name}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    selectedWallet.id ===
                                                        wallet.id
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false);
                                            setShowNewWalletDialog(true);
                                        }}
                                    >
                                        <PlusCircle className="h-5 w-5" />
                                        Create wallet
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create wallet</DialogTitle>
                    <DialogDescription>
                        Add a new wallet to your account.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Wallet name</Label>
                            <Input id="name" placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Subscription plan</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">
                                        <span className="font-medium">
                                            Free
                                        </span>{" "}
                                        -{" "}
                                        <span className="text-muted-foreground">
                                            Trial for two weeks
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        <span className="font-medium">Pro</span>{" "}
                                        -{" "}
                                        <span className="text-muted-foreground">
                                            $9/month per user
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setShowNewWalletDialog(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
