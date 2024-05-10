import { getAllUsers } from "actions/user-actions";
import ChatList from "components/chat/ChatList";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function ChatPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  const allUsers = await getAllUsers();
  console.log(currentUser);

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <ChatList allUsers={allUsers} currentUser={currentUser} />
    </main>
  );
}
