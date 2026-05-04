import { MessageCircle } from "lucide-react";

export const EmptyConversationState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
    <div className="w-16 h-16 border-2 border-black flex items-center justify-center">
      <MessageCircle className="w-7 h-7" />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-black uppercase tracking-widest">
        Select a conversation
      </p>
      <p className="text-xs font-mono text-neutral-400">
        Choose a chat from the left or contact a provider
      </p>
    </div>
  </div>
);
