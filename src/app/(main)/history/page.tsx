import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";

const transactions = [
  { id: 'tx1', gameName: 'Purple Haze Lottery', date: '2024-07-28 10:30 AM', type: 'Entry', amount: '-10 TON', status: 'Confirmed', txId: '0xabc123def456' },
  { id: 'tx2', gameName: 'Cosmic Coin Flip', date: '2024-07-27 02:15 PM', type: 'Win', amount: '+9.5 TON', status: 'Confirmed', txId: '0xdef456ghi789' },
  { id: 'tx3', gameName: 'Galaxy Dice Roll', date: '2024-07-26 08:00 AM', type: 'Loss', amount: '-2 TON', status: 'Confirmed', txId: '0xghi789jkl012' },
  { id: 'tx4', name: 'TON Speed Roulette', date: '2024-07-25 11:45 PM', type: 'Entry', amount: '-5 TON', status: 'Pending', txId: '0xjkl012mno345' },
  { id: 'tx5', name: 'Purple Haze Lottery', date: '2024-07-24 05:20 PM', type: 'Win', amount: '+500 TON', status: 'Confirmed', txId: '0xmno345pqr678' },
];

export default function TransactionHistoryPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="font-headline text-4xl font-bold mb-2 text-primary">Transaction History</h1>
        <p className="text-muted-foreground text-lg">Review your past game entries, wins, and losses.</p>
      </section>

      <section className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-card">
              <TableHead>Game</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-card/80">
                <TableCell className="font-medium">{tx.gameName || tx.name}</TableCell>
                <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={tx.type === 'Win' ? 'default' : tx.type === 'Loss' ? 'destructive' : 'secondary'}
                    className={cn(
                      tx.type === 'Win' && 'bg-green-500/20 text-green-400 border-green-500/30',
                      tx.type === 'Loss' && 'bg-red-500/20 text-red-400 border-red-500/30',
                      tx.type === 'Entry' && 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    )}
                  >
                    {tx.type === 'Win' && <ArrowUpRight className="mr-1 h-3 w-3" />}
                    {tx.type === 'Loss' && <ArrowDownLeft className="mr-1 h-3 w-3" />}
                    {tx.type === 'Entry' && <ArrowDownLeft className="mr-1 h-3 w-3" />}
                     {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className={cn(
                  "text-right font-semibold",
                  tx.type === 'Win' ? 'text-green-400' : tx.type === 'Loss' ? 'text-red-400' : 'text-foreground'
                )}>
                  {tx.amount}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={tx.status === 'Confirmed' ? 'default' : 'outline'}
                    className={cn(
                      tx.status === 'Confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    )}
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <a href={`https://tonscan.org/tx/${tx.txId}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 inline-flex items-center">
                    View <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

