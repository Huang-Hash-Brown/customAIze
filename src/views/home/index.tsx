import { ThreadList } from '@components/assistant-ui/thread-list';
import { Thread } from '@components/assistant-ui/thread';
import { AIAssistantProvider } from '@context/ai-assistant-provider';

export const Home = () => {
  return (
    <>
      <AIAssistantProvider>
        <div className="grid h-full grid-cols-[200px_1fr]">
          <ThreadList />
          <Thread />
        </div>
      </AIAssistantProvider>
    </>
  );
};

export default Home;
