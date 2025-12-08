'use server';

/**
 * @fileOverview Flow for customizing the message in the generated story for an event.
 *
 * - customizeStoryMessage - Function to customize the story message.
 * - CustomizeStoryMessageInput - Input type for customizeStoryMessage.
 * - CustomizeStoryMessageOutput - Output type for customizeStoryMessage.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeStoryMessageInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  participantName: z.string().describe('The name of the participant.'),
  customMessage: z.string().describe('The custom message to include in the story.'),
});
export type CustomizeStoryMessageInput = z.infer<typeof CustomizeStoryMessageInputSchema>;

const CustomizeStoryMessageOutputSchema = z.object({
  storyMessage: z.string().describe('The customized story message.'),
});
export type CustomizeStoryMessageOutput = z.infer<typeof CustomizeStoryMessageOutputSchema>;

export async function customizeStoryMessage(
  input: CustomizeStoryMessageInput
): Promise<CustomizeStoryMessageOutput> {
  return customizeStoryMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeStoryMessagePrompt',
  input: {schema: CustomizeStoryMessageInputSchema},
  output: {schema: CustomizeStoryMessageOutputSchema},
  prompt: `Create a personalized message for a story based on the event name, participant name, and a custom message.

Event Name: {{{eventName}}}
Participant Name: {{{participantName}}}
Custom Message: {{{customMessage}}}

Personalized Story Message:`,
});

const customizeStoryMessageFlow = ai.defineFlow(
  {
    name: 'customizeStoryMessageFlow',
    inputSchema: CustomizeStoryMessageInputSchema,
    outputSchema: CustomizeStoryMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
