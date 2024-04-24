"use client";

import ReactQueryClientProviders from "config/ReactQueryClientProvider";
import { ThemeProvider } from "components/material-tailwind";
import { RecoilRoot } from "recoil";

export default function RootProvider({ children }) {
  return (
    <RecoilRoot>
      <ReactQueryClientProviders>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryClientProviders>
    </RecoilRoot>
  );
}
