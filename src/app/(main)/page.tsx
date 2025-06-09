import { GameCard } from "@/components/game/game-card";
import { Ticket, Dices, CircleDollarSign, Zap } from "lucide-react";

const games = [
  { id: '1', name: 'Purple Haze Lottery', entryFee: '10 TON', prizePool: '5000 TON', Icon: Ticket, imageSrc: 'https://placehold.co/600x400.png', imageHint: 'lottery tickets' },
  { id: '2', name: 'Cosmic Coin Flip', entryFee: '5 TON', prizePool: 'Bet Amount x1.9', Icon: CircleDollarSign, imageSrc: 'https://placehold.co/600x400.png', imageHint: 'flipping coin' },
  { id: '3', name: 'Galaxy Dice Roll', entryFee: '2 TON', prizePool: 'Up to x5 Bet', Icon: Dices, imageSrc: 'https://placehold.co/600x400.png', imageHint: 'rolling dice' },
  { id: '4', name: 'TON Speed Roulette', entryFee: '1 TON', prizePool: 'Up to x35 Bet', Icon: Zap, imageSrc: 'https://placehold.co/600x400.png', imageHint: 'roulette wheel' },
];

export default function GameLobbyPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold mb-2 text-primary">Game Lobby</h1>
        <p className="text-muted-foreground text-lg">Choose your game and try your luck!</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard 
            key={game.id}
            name={game.name}
            entryFee={game.entryFee}
            prizePool={game.prizePool}
            Icon={game.Icon}
            imageSrc={game.imageSrc}
            imageHint={game.imageHint}
          />
        ))}
      </section>
    </div>
  );
}
