"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

export const sendMessage = async ({
  message,
  chatUserId,
}: {
  message: string;
  chatUserId: string;
}) => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  await supabase.from("messages").insert({
    message,
    receiver: chatUserId,
    sender: currentUser.id,
  });

  const { data } = await supabase
    .from("messages")
    .select("*")
    .or(`receiver.eq.${chatUserId},receiver.eq.${currentUser.id}`)
    .or(`sender.eq.${chatUserId},sender.eq.${currentUser.id}`)
    .order("created_at", { ascending: true });

  return data;
};

export const getAllMessages = async ({
  chatUserId,
}: {
  chatUserId: string;
}) => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .or(`receiver.eq.${chatUserId},receiver.eq.${currentUser.id}`)
    .or(`sender.eq.${chatUserId},sender.eq.${currentUser.id}`)
    .order("created_at", { ascending: true });

  if (messagesError) {
    return [];
  }

  return data;
};
