import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface GameCardProps {
  name: string;
  entryFee: string;
  prizePool: string;
  Icon: LucideIcon;
  imageSrc?: string;
  imageHint?: string;
}

export function GameCard({ name, entryFee, prizePool, Icon, imageSrc, imageHint }: GameCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card border-border">
      {imageSrc && (
        <div className="relative h-48 w-full">
          <Image 
            src={imageSrc} 
            alt={name} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={imageHint || "game visual"}
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex items-center mb-2">
          <Icon className="h-8 w-8 mr-3 text-primary" />
          <CardTitle className="font-headline text-2xl text-foreground">{name}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Dive into the thrill!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-foreground">Entry Fee:</span> 
            <span className="text-primary ml-1">{entryFee}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-foreground">Prize Pool:</span> 
            <span className="text-green-400 ml-1">{prizePool}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3 text-base">
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
}
