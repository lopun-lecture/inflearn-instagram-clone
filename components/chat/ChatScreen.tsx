"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllMessages, sendMessage } from "actions/message-actions";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function ChatScreen({ chatUser, currentUser }) {
  const supabase = createBrowserSupabaseClient();

  const [message, setMessage] = useState("");
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setMessage("");
    },
  });

  const messagesQuery = useQuery({
    queryKey: ["messages", chatUser.id],
    queryFn: async () => {
      return getAllMessages({ chatUserId: chatUser.id });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages_insert_subscription")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" &&
            !payload.errors &&
            !!payload.new &&
            (payload.new.receiver === currentUser.id ||
              payload.new.sender === currentUser.id)
          ) {
            messagesQuery.refetch();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <section className="w-full h-screen overflow-scroll">
      <div className="bg-gray-50 h-full">
        <div className="flex h-full">
          <div className="flex flex-col w-full">
            {/* chat user */}
            <div className="p-3 bg-gray-200">
              <div className="flex items-center">
                <img
                  src={chatUser.imageUrl}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{chatUser.name}</h2>
                  <p className="text-sm text-gray-500">Active 2m ago</p>
                </div>
              </div>
            </div>

            {/* chat messages */}
            <div className="p-4 flex-1 bg-white">
              <div className="flex flex-col gap-2 overflow-y-auto">
                {messagesQuery.data &&
                  messagesQuery.data.map((message, index) =>
                    message.sender === currentUser.id ? (
                      <div
                        key={index}
                        className="flex items-center justify-end"
                      >
                        <div className="bg-blue-500 text-white px-4 py-2 rounded">
                          {message.message}
                        </div>
                      </div>
                    ) : (
                      <div key={index} className="flex items-center">
                        <div className="bg-gray-100 px-4 py-2 rounded">
                          {message.message}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-gray-50 flex items-center justify-center w-full">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 h-12 border-gray-500 border-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                disabled={sendMessageMutation.isPending}
                onClick={() => {
                  sendMessageMutation.mutate({
                    chatUserId: chatUser.id,
                    message,
                  });
                }}
                className={twMerge(
                  "text-white px-4 h-12",
                  sendMessageMutation.isPending ? "bg-blue-300" : "bg-blue-500"
                )}
              >
                {sendMessageMutation.isPending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
