"use client";

import { useState, type FormEvent } from "react";

interface ApplyFormProps {
  heading?: string;
}

export default function ApplyForm({ heading }: ApplyFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="content-block">
      <div className="container">
        {heading && <h2 className="content-block__heading">{heading}</h2>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__field">
            <label className="form__label" htmlFor="apply-name">Name</label>
            <input
              className="form__input"
              type="text"
              id="apply-name"
              name="name"
              required
              autoComplete="name"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="apply-email">Email</label>
            <input
              className="form__input"
              type="email"
              id="apply-email"
              name="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="apply-experience">Experience</label>
            <textarea
              className="form__textarea"
              id="apply-experience"
              name="experience"
              required
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="apply-availability">Availability</label>
            <input
              className="form__input"
              type="text"
              id="apply-availability"
              name="availability"
              required
            />
          </div>
          <div className="form__field form__field--checkbox">
            <label className="form__checkbox-label">
              <input type="checkbox" name="consent" required />
              <span>
                I agree to the processing of my data in accordance with the{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </span>
            </label>
          </div>
          <button type="submit" className="form__submit">Submit Application</button>
          {status === "success" && (
            <div className="form__message form__message--success">
              Thank you! Your application has been received.
            </div>
          )}
          {status === "error" && (
            <div className="form__message form__message--error">
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
