"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, ShieldAlert } from "lucide-react";
import { getStrategyAdvice, type StrategyAdviceInput, type StrategyAdviceOutput } from "@/ai/flows/strategy-advisor";

const strategyFormSchema = z.object({
  gameName: z.string().min(1, "Game name is required"),
  historicalData: z.string().min(10, "Historical data is required (min 10 characters)"),
  userQuery: z.string().optional(),
});

type StrategyFormValues = z.infer<typeof strategyFormSchema>;

const availableGames = [
  { value: "Purple Haze Lottery", label: "Purple Haze Lottery" },
  { value: "Cosmic Coin Flip", label: "Cosmic Coin Flip" },
  { value: "Galaxy Dice Roll", label: "Galaxy Dice Roll" },
  { value: "TON Speed Roulette", label: "TON Speed Roulette" },
];

export function StrategyForm() {
  const [advice, setAdvice] = useState<StrategyAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategyFormSchema),
    defaultValues: {
      gameName: "",
      historicalData: "Example: Lottery Draws Last 5: (1,5,10,23,45), (2,7,19,33,40), (8,12,22,30,38), (3,16,25,35,42), (6,11,20,29,48). My Win Rate: 15%.",
      userQuery: "",
    },
  });

  const onSubmit: SubmitHandler<StrategyFormValues> = async (data) => {
    setIsLoading(true);
    setAdvice(null);
    setError(null);
    try {
      const result = await getStrategyAdvice(data);
      setAdvice(result);
    } catch (e) {
      console.error(e);
      setError("Failed to get strategy advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border shadow-xl">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary flex items-center">
            <Lightbulb className="mr-2 h-7 w-7" />
            AI Strategy Advisor
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Get AI-powered advice based on historical data and probabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gameName" className="text-foreground">Game Name</Label>
            <Controller
              name="gameName"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="gameName" className="bg-input border-border text-foreground focus:ring-accent">
                    <SelectValue placeholder="Select a game" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border text-popover-foreground">
                    {availableGames.map(game => (
                      <SelectItem key={game.value} value={game.value} className="focus:bg-accent focus:text-accent-foreground">
                        {game.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.gameName && (
              <p className="text-sm text-destructive">{form.formState.errors.gameName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="historicalData" className="text-foreground">Historical Data</Label>
            <Textarea
              id="historicalData"
              {...form.register("historicalData")}
              placeholder="e.g., Past lottery numbers, win/loss streaks, opponent tendencies..."
              className="min-h-[120px] bg-input border-border text-foreground focus:ring-accent"
            />
            {form.formState.errors.historicalData && (
              <p className="text-sm text-destructive">{form.formState.errors.historicalData.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="userQuery" className="text-foreground">Your Specific Question (Optional)</Label>
            <Input
              id="userQuery"
              {...form.register("userQuery")}
              placeholder="e.g., What's the best betting strategy for current conditions?"
              className="bg-input border-border text-foreground focus:ring-accent"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-base">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Get Advice
          </Button>
        </CardFooter>
      </form>

      {error && (
         <Alert variant="destructive" className="m-6 mt-0">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {advice && (
        <div className="p-6 border-t border-border">
          <h3 className="font-headline text-2xl mb-3 text-primary">Strategic Advice:</h3>
          <Alert className="bg-card border-primary/30">
            <Lightbulb className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold">AI Recommendation</AlertTitle>
            <AlertDescription className="text-foreground whitespace-pre-wrap prose prose-sm max-w-none prose-p:text-foreground prose-strong:text-foreground">
              {advice.advice}
            </AlertDescription>
          </Alert>
          {advice.disclaimer && (
            <Alert variant="default" className="mt-4 bg-muted border-border">
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              <AlertTitle className="text-muted-foreground font-semibold">Disclaimer</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                {advice.disclaimer}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </Card>
  );
}

// Need to import Controller for ShadCN Select with React Hook Form
import { Controller } from "react-hook-form";
