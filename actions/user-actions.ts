"use server";

import { createServerSupabaseAdminClient } from "utils/supabase/server";

export const getAllUsers = async () => {
  const supabase = await createServerSupabaseAdminClient();

  const {
    data: { user: currentUser },
    error: currentUserError,
  } = await supabase.auth.getUser();

  if (currentUserError) {
    console.log(currentUserError);
    return [];
  }

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    console.log(error);
    return [];
  }

  return users.filter((user: any) => user.id! !== currentUser.id);
};
