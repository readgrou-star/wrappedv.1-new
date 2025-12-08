'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating examples of landing pages with personalized stories for event organizers.
 *
 * - generateLandingPageExamples - A function that generates examples of landing pages.
 * - GenerateLandingPageExamplesInput - The input type for the generateLandingPageExamples function.
 * - GenerateLandingPageExamplesOutput - The return type for the generateLandingPageExamples function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageExamplesInputSchema = z.object({
  formTitle: z.string().describe('The title of the form.'),
  eventType: z.string().describe('The type of event the form is for (e.g., Job Application, Event Registration).'),
  accentColor: z.string().describe('The accent color used in the story design (e.g., #6366F1).'),
});
export type GenerateLandingPageExamplesInput = z.infer<typeof GenerateLandingPageExamplesInputSchema>;

const GenerateLandingPageExamplesOutputSchema = z.object({
  examples: z.array(z.string()).describe('An array of example landing page descriptions.'),
});
export type GenerateLandingPageExamplesOutput = z.infer<typeof GenerateLandingPageExamplesOutputSchema>;

export async function generateLandingPageExamples(input: GenerateLandingPageExamplesInput): Promise<GenerateLandingPageExamplesOutput> {
  return generateLandingPageExamplesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandingPageExamplesPrompt',
  input: {schema: GenerateLandingPageExamplesInputSchema},
  output: {schema: GenerateLandingPageExamplesOutputSchema},
  prompt: `You are an expert marketing assistant, skilled at writing landing page examples.

  Given the following information about a form, generate three different example descriptions that could be used on a landing page to entice users to use the form.

  Form Title: {{{formTitle}}}
  Event Type: {{{eventType}}}
  Accent Color: {{{accentColor}}}

  The examples should be concise and engaging. Each description should highlight a different aspect of the form or its benefits.
  The descriptions should be creative, enticing event organizers to use the form and customize their landing page.
  Include a call to action within each description.

  Examples:
  `,
});

const generateLandingPageExamplesFlow = ai.defineFlow(
  {
    name: 'generateLandingPageExamplesFlow',
    inputSchema: GenerateLandingPageExamplesInputSchema,
    outputSchema: GenerateLandingPageExamplesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
