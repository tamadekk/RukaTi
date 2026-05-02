import { describe, it, expect, beforeEach } from "bun:test";
import { queryClient } from "@/lib/queryClient";
import { appendMessageToCache } from "../useChatQuery";
import { queryKeys } from "@/lib/queryKeys";
import type { ChatMessage } from "@/types/chat";

const buildMessage = (overrides: Partial<ChatMessage> = {}): ChatMessage => ({
  message_id: "msg-1",
  room_id: "room-1",
  sender_id: "user-1",
  text: "Hello",
  created_at: "2024-01-01T10:00:00Z",
  ...overrides,
});

beforeEach(() => {
  queryClient.clear();
});

describe("appendMessageToCache", () => {
  it("creates cache entry with the message when cache is empty", () => {
    const message = buildMessage();
    appendMessageToCache("room-1", message);

    const cached = queryClient.getQueryData<ChatMessage[]>(
      queryKeys.chatMessages("room-1"),
    );
    expect(cached).toEqual([message]);
  });

  it("appends new message to the end of existing messages", () => {
    const first = buildMessage({ message_id: "msg-1", text: "First" });
    const second = buildMessage({ message_id: "msg-2", text: "Second" });

    queryClient.setQueryData(queryKeys.chatMessages("room-1"), [first]);
    appendMessageToCache("room-1", second);

    const cached = queryClient.getQueryData<ChatMessage[]>(
      queryKeys.chatMessages("room-1"),
    );
    expect(cached).toEqual([first, second]);
  });

  it("does not add a duplicate message with the same message_id", () => {
    const message = buildMessage({ message_id: "msg-1" });

    queryClient.setQueryData(queryKeys.chatMessages("room-1"), [message]);
    appendMessageToCache("room-1", message);

    const cached = queryClient.getQueryData<ChatMessage[]>(
      queryKeys.chatMessages("room-1"),
    );
    expect(cached).toHaveLength(1);
  });

  it("does not modify cache for a different room", () => {
    const messageA = buildMessage({ room_id: "room-A", message_id: "msg-A" });
    const messageB = buildMessage({ room_id: "room-B", message_id: "msg-B" });

    queryClient.setQueryData(queryKeys.chatMessages("room-A"), [messageA]);
    appendMessageToCache("room-B", messageB);

    const cachedA = queryClient.getQueryData<ChatMessage[]>(
      queryKeys.chatMessages("room-A"),
    );
    expect(cachedA).toEqual([messageA]);
  });
});
