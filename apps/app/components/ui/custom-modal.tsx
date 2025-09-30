import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./button";
import { toast } from "sonner";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CustomWalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { wallets, select } = useWallet();
    const { theme } = useTheme();
    const [showAllWallets, setShowAllWallets] = useState(false);

    const handleWalletSelect = async (walletName: string) => {
        try {
            const selectedWallet = wallets.find(wallet => wallet.adapter.name === walletName);
            if (selectedWallet) {
                await select(selectedWallet.adapter.name);
                toast.success(`${selectedWallet.adapter.name} connected`);
                setShowAllWallets(false);
                onClose();
            }
        } catch (error: any) {
            toast.error(`Error connecting to ${walletName}: ${error.message}`);
        }
    };

    const popularWalletNames = ['Phantom', 'MetaMask', 'Backpack'];
    
    const popularWallets = [
        {
            name: 'Phantom',
            icon: <Image src={theme === 'dark' ? "/phantom-dark.png" : "/phantom.png"} alt="Phantom" width={32} height={32} />,
            description: 'Most popular Solana wallet',
            installed: wallets.find(w => w.adapter.name === 'Phantom')?.readyState === 'Installed'
        },
        {
            name: 'MetaMask',
            icon: <Image src={theme === 'dark' ? "/metamask-dark.png" : "/metamask.png"} alt="MetaMask" width={24} height={24} />,
            description: 'Popular multi-chain wallet',
            installed: wallets.find(w => w.adapter.name === 'MetaMask')?.readyState === 'Installed'
        },
        {
            name: 'Backpack',
            icon: <Image src={theme === 'dark' ? "/backpack-dark.png" : "/backpack.png"} alt="Backpack" width={24} height={24} />,
            description: 'Modern Solana wallet',
            installed: wallets.find(w => w.adapter.name === 'Backpack')?.readyState === 'Installed'
        }
    ];

    // Get all other wallets that aren't in the popular list
    const otherWallets = wallets.filter(
        wallet => !popularWalletNames.includes(wallet.adapter.name)
    );

    const handleClose = () => {
        setShowAllWallets(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
            <DialogContent className="bg-transparent border-0 p-0 shadow-none">
                <div className="crypto-glass-static bg-white/95 dark:bg-card/95 backdrop-blur-xl border-border/30 dark:border-border/50 rounded-3xl p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <DialogTitle className="text-xl font-semibold text-foreground">
                            Connect Wallet
                            <span className="block text-sm text-muted-foreground mt-1 font-normal">
                                Choose your preferred wallet to connect to Soloyal
                            </span>
                        </DialogTitle>
                    </div>

                    {/* Wallet Options */}
                    <div className="space-y-3 ">
                        {/* Popular Wallets */}
                        {popularWallets.map((wallet) => (
                            <Button
                                key={wallet.name}
                                variant="outline"
                                className="w-full h-16 crypto-glass bg-white/90 hover:bg-primary/5 border-gray-200/80 hover:border-primary/20 dark:bg-background/30 dark:hover:bg-primary/15 dark:border-border/50 dark:hover:border-primary/30 text-foreground transition-all duration-300 ease-out relative overflow-hidden flex items-center justify-start gap-4 p-4 group shadow-sm hover:shadow-md"
                                onClick={() => handleWalletSelect(wallet.name)}
                            >
                                <div className="text-2xl">{wallet.icon}</div>
                                <div className="flex-1 text-left">
                                    <div className="font-medium text-gray-900 dark:text-foreground group-hover:text-primary transition-colors">
                                        {wallet.name}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-muted-foreground">
                                        {wallet.description}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {wallet.installed ? (
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                                            <span className="text-xs text-green-600 dark:text-green-400">
                                                Installed
                                            </span>
                                        </div>
                                    ) : (
                                    <span className="text-xs text-gray-500 dark:text-muted-foreground">
                                            Install
                                        </span>
                                    )}
                                </div>
                            </Button>
                        ))}
                    <div className="h-px   bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                    

                        {/* More Wallets Toggle */}
                        {otherWallets.length > 0 && (
                            <>
                                <Button
                                    variant="ghost"
                                    className="w-full h-12 crypto-button  text-sm text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => setShowAllWallets(!showAllWallets)}
                                >
                                    {showAllWallets ? (
                                        <>
                                            Show Less
                                            <ChevronUp className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            More Wallets ({otherWallets.length})
                                            <ChevronDown className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>


                                {/* All Other Wallets */}
                                {showAllWallets && (
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        {otherWallets.map((wallet) => {
                                            return (
                                                <Button
                                                    key={wallet.adapter.name}
                                                    variant="ghost"
                                                    className="h-12 crypto-button rounded-lg  flex items-center justify-between gap-2 px-3 group"
                                                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                                                >
                                                    <div className="flex-1 text-left truncate">
                                                        <div className="font-medium text-sm  text-center text-foreground group-hover:text-primary transition-colors truncate">
                                                            {wallet.adapter.name}
                                                        </div>
                                                    </div>
                                             
                                                </Button>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

           
                </div>
            </DialogContent>
        </Dialog>
    );
}