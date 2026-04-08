import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/contentful";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, experience, availability, cvLink } = body;

    if (!name || !email || !experience || !availability) {
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
      from: "Matter Website <noreply@matter-berlin.com>",
      to: toEmail,
      subject: `New application from ${name}`,
      html: `
        <h2>New Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <h3>Experience</h3>
        <p>${escapeHtml(experience)}</p>
        <p><strong>Availability:</strong> ${escapeHtml(availability)}</p>
        ${cvLink ? `<p><strong>CV Link:</strong> <a href="${escapeHtml(cvLink)}">${escapeHtml(cvLink)}</a></p>` : "<p><strong>CV:</strong> Not provided</p>"}
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply form error:", error);
    return NextResponse.json(
      { error: "Failed to send application" },
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
