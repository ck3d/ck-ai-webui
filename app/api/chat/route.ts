import { OpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, experimental_streamText } from 'ai';

const openai = new OpenAI({ baseURL: process.env.OPENAI_BASE_URL, });

export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Call the language model
  const result = await experimental_streamText({
    model: openai.chat('gpt-3.5-turbo'),
    messages,
  });

  // Respond with the stream
  return new StreamingTextResponse(result.toAIStream());
}
