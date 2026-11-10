"use client";

import { useRef, useState, type FormEvent } from "react";
import { budgetOptions, serviceOptions, timelineOptions, validateInquiry, type InquiryErrors } from "@/lib/contact-validation";
import { trackEvent } from "@/lib/analytics";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function InquiryForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [message, setMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      fullName: values.get("fullName"),
      email: values.get("email"),
      company: values.get("company"),
      website: values.get("website"),
      services: values.getAll("services"),
      budget: values.get("budget"),
      timeline: values.get("timeline"),
      description: values.get("description"),
      consent: values.get("consent") === "on",
      websiteConfirm: values.get("websiteConfirm"),
    };
    const validation = validateInquiry(payload);
    setErrors(validation.errors);
    if (!validation.data) {
      setState("error");
      setMessage("Please review the fields marked below.");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setState("sending");
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validation.data, submissionId: submissionId.current || (submissionId.current = crypto.randomUUID()) }),
      });
      const result = await response.json() as { ok?: boolean; message?: string; errors?: InquiryErrors };
      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setState("error");
        setMessage(result.message || "We couldn't send your inquiry. Please try again shortly.");
        return;
      }
      trackEvent("contact_form_success");
      setState("success");
      setMessage("Thanks for reaching out. Your inquiry has been sent successfully.");
      form.reset();
      submissionId.current = crypto.randomUUID();
    } catch {
      setState("error");
      setMessage("We couldn't connect to the inquiry service. Please try again shortly.");
    }
  }

  function describedBy(field: keyof InquiryErrors) {
    return errors[field] ? `${String(field)}-error` : undefined;
  }

  return (
    <form className="contact-form" onSubmit={submitInquiry} noValidate aria-labelledby="inquiry-form-title">
      <div className="contact-form__status" role="status" aria-live="polite" aria-atomic="true">
        {message && <p className={`contact-form__message contact-form__message--${state}`}>{message}</p>}
      </div>
      <div className="contact-form__grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name <span>(required)</span></label>
          <input id="fullName" name="fullName" autoComplete="name" required maxLength={100} aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy("fullName")} />
          {errors.fullName && <p className="form-field__error" id="fullName-error">{errors.fullName}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Business email <span>(required)</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
          {errors.email && <p className="form-field__error" id="email-error">{errors.email}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="company">Company or brand <span>(required)</span></label>
          <input id="company" name="company" autoComplete="organization" required maxLength={120} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("company")} />
          {errors.company && <p className="form-field__error" id="company-error">{errors.company}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="website">Website or social link <span>(optional)</span></label>
          <input id="website" name="website" type="url" autoComplete="url" placeholder="https://" maxLength={300} aria-invalid={Boolean(errors.website)} aria-describedby={describedBy("website")} />
          {errors.website && <p className="form-field__error" id="website-error">{errors.website}</p>}
        </div>
        <fieldset className="form-field form-field--wide" aria-describedby={describedBy("services")}>
          <legend>Services needed <span>(choose at least one)</span></legend>
          <div className="contact-form__choices">
            {serviceOptions.map((service) => <label className="choice" key={service}><input type="checkbox" name="services" value={service} aria-invalid={Boolean(errors.services)} /><span>{service}</span></label>)}
          </div>
          {errors.services && <p className="form-field__error" id="services-error">{errors.services}</p>}
        </fieldset>
        <div className="form-field">
          <label htmlFor="budget">Budget <span>(optional)</span></label>
          <select id="budget" name="budget" defaultValue=""><option value="">Select a range</option>{budgetOptions.map((option) => <option key={option}>{option}</option>)}</select>
        </div>
        <div className="form-field">
          <label htmlFor="timeline">Timeline <span>(optional)</span></label>
          <select id="timeline" name="timeline" defaultValue=""><option value="">Select a timeline</option>{timelineOptions.map((option) => <option key={option}>{option}</option>)}</select>
        </div>
        <div className="form-field form-field--wide">
          <label htmlFor="description">Project description <span>(required)</span></label>
          <textarea id="description" name="description" rows={6} required minLength={20} maxLength={5000} placeholder="What are you hoping to improve, build, or explore?" aria-invalid={Boolean(errors.description)} aria-describedby={describedBy("description")} />
          {errors.description && <p className="form-field__error" id="description-error">{errors.description}</p>}
        </div>
        <div className="contact-form__trap" aria-hidden="true">
          <label htmlFor="websiteConfirm">Leave this field blank</label>
          <input id="websiteConfirm" name="websiteConfirm" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-field form-field--wide">
          <label className="choice choice--consent" htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy("consent")} />
            <span>I agree Trio Digitals may use the information above to respond to my inquiry. <strong>(required)</strong></span>
          </label>
          {errors.consent && <p className="form-field__error" id="consent-error">{errors.consent}</p>}
        </div>
      </div>
      <button className="button button--primary contact-form__submit" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending inquiry..." : "Send project inquiry"}
      </button>
      <p className="contact-form__privacy">Please do not include sensitive personal or financial information.</p>
    </form>
  );
}
