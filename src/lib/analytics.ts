"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __trioAnalyticsConsent?: "granted" | "denied";
  }
}

export function trackEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || window.__trioAnalyticsConsent !== "granted" || !window.gtag) return;
  window.gtag("event", eventName, parameters);
}
