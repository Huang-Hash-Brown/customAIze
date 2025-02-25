import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { ThreadList } from '@components/assistant-ui/thread-list';
import { Thread } from '@components/assistant-ui/thread';

export const Home = () => {
  const runtime = useChatRuntime({
    api: '/api/chat',
  });

  return (
    <>
      <AssistantRuntimeProvider runtime={runtime}>
        <div className="grid h-full grid-cols-[200px_1fr]">
          <ThreadList />
          <Thread />
        </div>
      </AssistantRuntimeProvider>
    </>
  );
};

export default Home;
