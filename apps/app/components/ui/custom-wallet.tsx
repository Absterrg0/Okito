'use client'

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Copy, LogOut, Wallet, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import CustomWalletModal from './custom-modal';

export default function CustomWallet() {
    const { publicKey, disconnect, connected } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();
    const isVerifyPage = pathname === '/verify' || '/checkout';

    const handleConnect = () => {
        setIsModalOpen(true);
    };

    const handleDisconnect = async () => {
        if(!connected) return;
        try{
            await disconnect();
            toast.success('Wallet disconnected');
        }
        catch(error){
            console.error('Failed to disconnect wallet', error);
            toast.error('Failed to disconnect wallet');
        }
    };

    const copyAddress = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey.toBase58());
            toast.success('Address copied to clipboard');
        }
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    if (!connected) {
        return (
            <>
                <Button
                    onClick={handleConnect}
                    variant="default"
                    size="default"
                    className="crypto-glass bg-primary/10 hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/25 text-primary border-primary/30 hover:border-primary/50 shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 ease-out relative overflow-hidden"
                >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </Button>
                
                <CustomWalletModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            </>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="default"
                    className="crypto-glass bg-accent/10 hover:bg-accent/20 dark:bg-accent/15 dark:hover:bg-accent/25 text-foreground
                    hover:text-primary border-accent/30 hover:border-accent/50 shadow-accent/10 hover:shadow-accent/20 transition-all duration-300 ease-out relative overflow-hidden"
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {formatAddress(publicKey!.toBase58())}
                    <ChevronDown className="w-4 h-4 opacity-60" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-48 crypto-glass-static bg-popover/95 backdrop-blur-xl border-border/50"
            >
                <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                    <Copy className="w-4 h-4" />
                    Copy Address
                </DropdownMenuItem>
                {isVerifyPage && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={handleDisconnect} 
                            className="cursor-pointer text-red-600 "
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 