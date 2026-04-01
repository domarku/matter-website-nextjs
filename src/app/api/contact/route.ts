import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/contentful";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, services } = body;

    if (!name || !email || !services) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const settings = await getSiteSettings();
    const toEmail = settings?.notificationEmail;

    if (!toEmail) {
      console.error("No notification email configured in Contentful");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Matter Website <onboarding@resend.dev>",
      to: toEmail,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <h3>Description of Required Services</h3>
        <p>${escapeHtml(services)}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
