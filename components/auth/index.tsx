"use client";

import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function AuthPage() {
  const [view, setView] = useState("SIGNUP");

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-light-blue-50">
      {view === "SIGNIN" ? (
        <SignIn setView={setView} />
      ) : (
        <SignUp setView={setView} />
      )}
    </main>
  );
}
