'use client';

import type { ReactNode } from 'react';
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react';

const MY_API_ENDPOINT = `${import.meta.env.VITE_APP_API_URL}/api/chat`;

// Custom ModelAdapter to support streaming messages
const MyModelAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
    const result = await fetch(MY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Forward the messages in the chat to the API
      body: JSON.stringify({
        messages,
      }),
      // Cancel the request if the user hits the cancel button or escape key
      signal: abortSignal,
    });

    if (!result.body) {
      throw new Error('No response body from server');
    }

    const reader = result.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = '';

    // Stream data incrementally
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Filter out irrelevant lines (e.g., "OPENROUTER PROCESSING" or "data: [DONE]")
      const lines = chunk
        .split('\n')
        .filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        try {
          // Parse the JSON part of the line
          const json = JSON.parse(line.replace(/^data: /, ''));
          const delta = json.choices[0]?.delta;

          // Append only the `content` field
          if (delta?.content) {
            fullContent += delta.content;

            // Yield the updated content
            yield {
              content: [
                {
                  type: 'text',
                  text: fullContent,
                },
              ],
            };
          }
        } catch (error) {
          console.error('Failed to parse line:', line, error);
        }
      }
    }
  },
};

export function AIAssistantProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const runtime = useLocalRuntime(MyModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
