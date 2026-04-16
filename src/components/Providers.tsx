"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flag-icons/css/flag-icons.min.css";

import { theme } from "@/styles/theme";
import { GlobalStyles } from '@/styles/GlobalStyles';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
            style={{ zIndex: 99999 }}
          />
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}