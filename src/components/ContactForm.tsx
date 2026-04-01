"use client";

import { useState, type FormEvent } from "react";

interface ContactFormProps {
  heading?: string;
}

export default function ContactForm({ heading }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
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
            <label className="form__label" htmlFor="contact-name">Name</label>
            <input
              className="form__input"
              type="text"
              id="contact-name"
              name="name"
              required
              autoComplete="name"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="contact-email">Email</label>
            <input
              className="form__input"
              type="email"
              id="contact-email"
              name="email"
              required
              autoComplete="email"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="contact-phone">Phone Number</label>
            <input
              className="form__input"
              type="tel"
              id="contact-phone"
              name="phone"
              autoComplete="tel"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="contact-services">
              Description of Required Services
            </label>
            <textarea
              className="form__textarea"
              id="contact-services"
              name="services"
              required
            />
          </div>
          <button type="submit" className="form__submit">Send Message</button>
          {status === "success" && (
            <div className="form__message form__message--success">
              Thank you! Your message has been sent.
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
