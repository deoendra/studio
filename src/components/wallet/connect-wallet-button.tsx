"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectWalletModal } from "./connect-wallet-modal";
import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
      <ConnectWalletModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
