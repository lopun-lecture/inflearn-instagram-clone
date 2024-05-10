"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getRandomImage } from "utils/image-util";
import { createBrowserSupabaseClient } from "utils/supabase/client";

import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const Person = ({
  userId,
  name,
  imageUrl,
  active,
  setActiveUserId,
  onlineAt,
}) => (
  <button
    className={twMerge("flex items-center p-4", active && "bg-light-blue-50")}
    onClick={() => setActiveUserId(userId)}
  >
    <img src={imageUrl} alt="avatar" className="w-10 h-10 rounded-full" />
    <div className="ml-4 flex flex-col justify-center items-start">
      <h2 className="text-lg font-semibold">{name}</h2>
      {onlineAt && <span>{timeAgo.format(Date.parse(onlineAt))}</span>}
    </div>
  </button>
);

export default function ChatPeopleList({
  allUsers,
  activeUserId,
  setActiveUserId,
  currentUser,
}) {
  const supabase = createBrowserSupabaseClient();
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const chatRoomChannel = supabase.channel("shared-chat-room", {
      config: {
        presence: {
          key: currentUser.id,
        },
      },
    });

    chatRoomChannel
      .on("presence", { event: "sync" }, () => {
        const newState = chatRoomChannel.presenceState();
        setOnlineUsers(newState);
        console.log("sync", newState);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        const presenceTrackStatus = await chatRoomChannel.track({
          online_at: new Date().toISOString(),
        });

        setOnlineUsers(presenceTrackStatus);
      });

    return () => {
      chatRoomChannel.unsubscribe();
    };
  }, []);

  return (
    <section className="w-96 h-screen flex flex-col">
      {allUsers.map((user, index) => (
        <Person
          key={index}
          userId={user.id}
          name={user.email.split("@")[0]}
          imageUrl={getRandomImage(index + 1)}
          active={user.id === activeUserId}
          setActiveUserId={setActiveUserId}
          onlineAt={onlineUsers[user.id]?.[0]?.online_at}
        />
      ))}
    </section>
  );
}
