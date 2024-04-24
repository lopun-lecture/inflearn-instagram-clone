import LogoutButton from "components/auth/logout-button";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="h-screen w-full flex flex-col gap-2 justify-center items-center">
      <h1 className="text-xl font-bold">
        Welcome {user?.email?.split("@")?.[0]}!
      </h1>
      <LogoutButton />
    </main>
  );
}
