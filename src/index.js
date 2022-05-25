import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const container = document.getElementById('root');
const root = createRoot(container);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    Sentry.init({
        dsn: "https://27a4b342f56f4d6290a5303b9276235f@o1249248.ingest.sentry.io/6436432",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

root.render(
    <React.StrictMode>
        <Sentry.ErrorBoundary showDialog={false}>
            <App />
        </Sentry.ErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
