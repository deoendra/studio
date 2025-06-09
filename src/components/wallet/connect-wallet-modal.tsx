import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Wallet, Info } from "lucide-react"; // Placeholder icons

export function ConnectWalletModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center text-primary">Connect Your TON Wallet</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Choose your preferred TON wallet to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline" className="w-full justify-start text-lg py-6 border-primary hover:bg-primary/10">
            <Wallet className="mr-2 h-6 w-6 text-primary" /> Tonkeeper
          </Button>
          <Button variant="outline" className="w-full justify-start text-lg py-6 border-primary hover:bg-primary/10">
            <Wallet className="mr-2 h-6 w-6 text-primary" /> MyTonWallet
          </Button>
          {/* Add other wallet options if necessary */}
        </div>
        <DialogFooter className="flex flex-col items-center sm:justify-center">
           <DialogDescription className="text-sm text-muted-foreground mb-2">
            New to TON wallets?
          </DialogDescription>
          <Button variant="link" className="text-accent hover:text-accent/80 p-0">
            <Info className="mr-1 h-4 w-4" />
            Step-by-step Guide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
