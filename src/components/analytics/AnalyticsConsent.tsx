"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const consentStorageKey = "trio-analytics-consent";
type Consent = "granted" | "denied" | null;
let memoryConsent: Consent = null;

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(consentStorageKey);
    return value === "granted" || value === "denied" ? value : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("trio-analytics-consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("trio-analytics-consent-change", callback);
  };
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const showBanner = consent === null || settingsOpen;

  useEffect(() => {
    if (!measurementId || !consent) return;

    window.__trioAnalyticsConsent = consent;
    if (consent === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
  }, [consent]);

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    const pageLocation = `${window.location.origin}${pathname}`;
    trackEvent("page_view", { page_path: pathname, page_location: pageLocation, page_title: document.title });
    if (pathname === "/work") trackEvent("portfolio_view", { page_path: pathname });
    if (pathname.startsWith("/work/")) trackEvent("case_study_engagement", { page_path: pathname });
    if (pathname === "/services" || pathname.startsWith("/services/")) trackEvent("service_engagement", { page_path: pathname });
  }, [consent, pathname]);

  useEffect(() => {
    if (!measurementId || consent !== "granted") return;

    let formStarted = false;
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!formStarted && target instanceof Element && target.closest(".contact-form")) {
        formStarted = true;
        trackEvent("contact_form_start");
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const explicitEvent = anchor.dataset.analyticsEvent;
      if (explicitEvent) trackEvent(explicitEvent, { link_url: anchor.href });

      const href = anchor.href.toLowerCase();
      if (/\b(book|booking|reserve|reservation|opentable|resy|sevenrooms)\b/.test(href)) {
        trackEvent("booking_click", { link_url: anchor.href });
        return;
      }

      try {
        const targetUrl = new URL(anchor.href);
        const socialHosts = ["instagram.com", "facebook.com", "tiktok.com", "youtube.com", "linkedin.com", "x.com", "twitter.com"];
        if (targetUrl.origin !== window.location.origin && socialHosts.some((host) => targetUrl.hostname === host || targetUrl.hostname.endsWith(`.${host}`))) {
          trackEvent("outbound_social_click", { link_url: anchor.href, social_network: targetUrl.hostname });
        }
      } catch {
        // Ignore malformed links; navigation remains unaffected.
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("click", onClick);
    };
  }, [consent]);

  function chooseConsent(value: Exclude<Consent, null>) {
    memoryConsent = value;
    try {
      window.localStorage.setItem(consentStorageKey, value);
    } catch {
      // The current choice still applies for this page view if storage is unavailable.
    }
    window.__trioAnalyticsConsent = value;
    window.dispatchEvent(new Event("trio-analytics-consent-change"));
    setSettingsOpen(false);
  }

  if (!measurementId) return null;

  return (
    <>
      {consent === "granted" && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
          strategy="afterInteractive"
        />
      )}
      {showBanner ? (
        <section className="analytics-consent" aria-label="Analytics cookie preferences" aria-describedby="analytics-consent-description">
          <div>
            <p id="analytics-consent-description">Optional Google Analytics helps us understand how the site is used. It loads only if you allow analytics. You can change this choice later.</p>
          </div>
          <div className="analytics-consent__actions">
            <button type="button" className="analytics-consent__button analytics-consent__button--quiet" onClick={() => chooseConsent("denied")}>Reject optional</button>
            <button type="button" className="analytics-consent__button" onClick={() => chooseConsent("granted")}>Allow analytics</button>
          </div>
        </section>
      ) : (
        <button type="button" className="analytics-settings" onClick={() => setSettingsOpen(true)}>Cookie settings</button>
      )}
    </>
  );
}
