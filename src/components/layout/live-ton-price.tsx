"use client";

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export function LiveTonPrice() {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPrice('$2.34'); // Example price
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center text-sm text-foreground">
      <TrendingUp className="h-4 w-4 mr-1.5 text-green-400" />
      <span className="font-medium">TON:</span>
      <span className="ml-1">{price ? price : 'Loading...'}</span>
    </div>
  );
}
