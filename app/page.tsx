'use client';

import { MemoizedReactMarkdown } from '@/components/markdown';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id}>
          <div className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
          </div>
          <div>
            <MemoizedReactMarkdown>
              {m.content}
            </MemoizedReactMarkdown>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
