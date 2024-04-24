import RootProvider from "components/root-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { createServerSupabaseClient } from "utils/supabase/server";
import AuthProvider from "components/auth/auth-provider";
import Auth from "components/auth";
import MainLayout from "components/layout/main-layout";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <RootProvider>
          <AuthProvider accessToken={session?.access_token}>
            {session?.user ? <MainLayout>{children}</MainLayout> : <Auth />}
          </AuthProvider>
        </RootProvider>
      </body>
    </html>
  );
}
