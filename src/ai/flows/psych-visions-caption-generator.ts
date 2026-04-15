'use server';
/**
 * @fileOverview A Genkit flow for generating horror-themed captions for uploaded photos.
 *
 * - generatePsychVisionsCaptions - A function that generates horror-themed captions based on a photo and optional description.
 * - PsychVisionsCaptionGeneratorInput - The input type for the generatePsychVisionsCaptions function.
 * - PsychVisionsCaptionGeneratorOutput - The return type for the generatePsychVisionsCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PsychVisionsCaptionGeneratorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a PSIH outfit, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional description or context for the photo.'),
});
export type PsychVisionsCaptionGeneratorInput = z.infer<
  typeof PsychVisionsCaptionGeneratorInputSchema
>;

const PsychVisionsCaptionGeneratorOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of unique, horror-themed descriptive captions.'),
});
export type PsychVisionsCaptionGeneratorOutput = z.infer<
  typeof PsychVisionsCaptionGeneratorOutputSchema
>;

export async function generatePsychVisionsCaptions(
  input: PsychVisionsCaptionGeneratorInput
): Promise<PsychVisionsCaptionGeneratorOutput> {
  return psychVisionsCaptionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'psychVisionsCaptionPrompt',
  input: {schema: PsychVisionsCaptionGeneratorInputSchema},
  output: {schema: PsychVisionsCaptionGeneratorOutputSchema},
  prompt: `You are a creative social media caption generator for a dark horror-streetwear brand called "PSIH".
Your task is to generate several unique, engaging, and horror-themed descriptive captions for a user-uploaded photo of a PSIH outfit.

The captions should embody the brand's dark, brutalist, and unsettling aesthetic.
Aim for captions that evoke feelings of dread, mystery, the occult, or post-apocalyptic vibes.
Do not use emojis unless specifically requested. Each caption should be distinct and not just a rephrasing of another.

Input:
{{#if description}}Description: {{{description}}}{{/if}}
Photo: {{media url=photoDataUri}}

Generate at least 3, but no more than 5, captions. The output should be a JSON object with a single field 'captions', which is an array of strings.
`,
});

const psychVisionsCaptionGeneratorFlow = ai.defineFlow(
  {
    name: 'psychVisionsCaptionGeneratorFlow',
    inputSchema: PsychVisionsCaptionGeneratorInputSchema,
    outputSchema: PsychVisionsCaptionGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
