"use client";

import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function Auth() {
  const [view, setView] = useState("SIGNUP");

  return view === "SIGNIN" ? (
    <SignIn setView={setView} />
  ) : (
    <SignUp setView={setView} />
  );
}
