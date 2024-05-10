"use client";

import { getRandomImage } from "utils/image-util";
import ChatPeopleList from "./ChatPeopleList";
import ChatScreen from "./ChatScreen";
import { useState } from "react";

export default function ChatList({ allUsers, currentUser }) {
  const [activeUserId, setActiveUserId] = useState(null);

  return (
    <div className="w-full h-screen flex bg-gray-50">
      <ChatPeopleList
        allUsers={allUsers}
        activeUserId={activeUserId}
        setActiveUserId={setActiveUserId}
        currentUser={currentUser}
      />
      {activeUserId && (
        <ChatScreen
          chatUser={{
            id: activeUserId,
            name: allUsers
              .find((user) => user.id === activeUserId)
              .email.split("@")[0],
            imageUrl: getRandomImage(
              allUsers.findIndex((user) => user.id === activeUserId) + 1
            ),
          }}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
