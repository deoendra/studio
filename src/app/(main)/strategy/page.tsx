import { StrategyForm } from "@/components/strategy/strategy-form";

export default function StrategyAdvisorPage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold mb-2 text-primary">AI Strategy Advisor</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Leverage AI insights to refine your gaming strategy. Input game details and historical data to receive personalized advice.
        </p>
      </section>

      <section>
        <StrategyForm />
      </section>
    </div>
  );
}
