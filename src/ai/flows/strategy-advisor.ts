'use server';

/**
 * @fileOverview An AI-powered strategy advisor for games, providing users with strategic advice based on historical data and probabilities.
 *
 * - getStrategyAdvice - A function that generates strategic advice for a specified game.
 * - StrategyAdviceInput - The input type for the getStrategyAdvice function.
 * - StrategyAdviceOutput - The return type for the getStrategyAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StrategyAdviceInputSchema = z.object({
  gameName: z.string().describe('The name of the game for which strategy advice is requested.'),
  historicalData: z
    .string()
    .describe('Historical data related to the game, which includes past outcomes and relevant statistics.'),
  userQuery: z
    .string()
    .optional()
    .describe('The user query related to specific aspects of the game or strategy.'),
});
export type StrategyAdviceInput = z.infer<typeof StrategyAdviceInputSchema>;

const StrategyAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-generated strategic advice based on historical data and probabilities.'),
  disclaimer: z.string().optional().describe('A disclaimer regarding the advice provided.'),
});
export type StrategyAdviceOutput = z.infer<typeof StrategyAdviceOutputSchema>;

export async function getStrategyAdvice(input: StrategyAdviceInput): Promise<StrategyAdviceOutput> {
  return strategyAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'strategyAdvisorPrompt',
  input: {schema: StrategyAdviceInputSchema},
  output: {schema: StrategyAdviceOutputSchema},
  prompt: `You are an AI-powered strategy advisor for various gambling games. Your goal is to provide users with strategic advice based on historical data and probabilities to help them make informed decisions.

  Game Name: {{{gameName}}}
  Historical Data: {{{historicalData}}}
  User Query: {{{userQuery}}}

  Based on the provided game information and any specific user queries, generate strategic advice. Be clear, concise, and focus on actionable insights. If the user query is not provided, give general strategic advice for the specified game using historical data.
  Include a disclaimer stating that the advice is based on statistical analysis and does not guarantee wins.
  `, // Added userQuery in prompt
});

const strategyAdvisorFlow = ai.defineFlow(
  {
    name: 'strategyAdvisorFlow',
    inputSchema: StrategyAdviceInputSchema,
    outputSchema: StrategyAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
