import Link from "next/link";
import { TonLogo } from "@/components/icons/ton-logo";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { LiveTonPrice } from "./live-ton-price";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <TonLogo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold text-foreground">TON Gamble Hub</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <LiveTonPrice />
          </div>
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
