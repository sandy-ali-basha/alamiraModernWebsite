import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import RTLProvider from "theme/provider/RTLProvider";
import "./i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";
// * router
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RTLProvider>
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GoogleOAuthProvider clientId="775752714909-g4p45dg1brh27oje43v3a4ct397joa8s.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SnackbarProvider>
  </RTLProvider>
);

reportWebVitals();