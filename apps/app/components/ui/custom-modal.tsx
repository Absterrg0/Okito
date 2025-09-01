import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function CustomWalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { wallets, select } = useWallet();
    const {theme} = useTheme();

    const handleWalletSelect = async (walletName: string) => {
        try {
            const selectedWallet = wallets.find(wallet => wallet.adapter.name === walletName);
            if (selectedWallet) {
                await select(selectedWallet.adapter.name);
                toast.success(`${selectedWallet.adapter.name} connected`);
                onClose();
            }
        } catch (error: any) {
            toast.error(`Error connecting to ${walletName}: ${error.message}`);
        }
    };

    if (!isOpen) return null;

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-md mx-4">
                <div className="crypto-glass bg-white/95 dark:bg-card/95 backdrop-blur-xl border-border/30 dark:border-border/50 rounded-3xl p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Choose your preferred wallet to connect to Soloyal
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full hover:bg-black/10"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Wallet Options */}
                    <div className="space-y-3">
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
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-border/50">
                        <div className="text-center space-y-2">
                            <p className="text-xs text-gray-600 dark:text-muted-foreground">
                                New to Solana wallets?
                            </p>
                            <div className="flex justify-center gap-4 text-xs">
                                <a 
                                    href="https://phantom.app" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Get Phantom
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}