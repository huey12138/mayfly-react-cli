import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/style/tailwind.css";
import "./App.css";
import App from "./App";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import reportWebVitals from "./reportWebVitals";
import Package from "../package.json";
import { BrowserRouter } from "react-router-dom";
import { ClearCacheProvider } from "react-clear-cache";

Sentry.init({
  dsn: "https://20f8d430cd2342fbbd236ccc5e0fa531@o1098810.ingest.sentry.io/6123180",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  release: `${Package.name}@${Package.version}`,
  tracesSampleRate: 0.1,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Sentry.ErrorBoundary>
    <React.StrictMode>
      <ClearCacheProvider duration={5000} auto>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClearCacheProvider>
    </React.StrictMode>
  </Sentry.ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
