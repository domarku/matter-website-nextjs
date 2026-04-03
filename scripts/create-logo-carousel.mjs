/**
 * Creates the "logoCarousel" content type in Contentful.
 *
 * Usage:
 *   1. Add CONTENTFUL_MANAGEMENT_TOKEN to your .env
 *   2. Run: node scripts/create-logo-carousel.mjs
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env"
  );
  process.exit(1);
}

const BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/master`;
const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/vnd.contentful.management.v1+json",
};

async function run() {
  // 1. Create the content type
  console.log("Creating logoCarousel content type…");
  const createRes = await fetch(`${BASE}/content_types/logoCarousel`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      name: "Logo Carousel",
      displayField: "title",
      fields: [
        {
          id: "title",
          name: "Title",
          type: "Symbol",
          required: false,
          localized: false,
        },
        {
          id: "logos",
          name: "Logos",
          type: "Array",
          required: false,
          localized: false,
          items: {
            type: "Link",
            linkType: "Asset",
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    console.error("Failed to create content type:", JSON.stringify(err, null, 2));
    process.exit(1);
  }

  const contentType = await createRes.json();
  const version = contentType.sys.version;
  console.log(`Created (version ${version}). Activating…`);

  // 2. Activate (publish) the content type
  const activateRes = await fetch(
    `${BASE}/content_types/logoCarousel/published`,
    {
      method: "PUT",
      headers: {
        ...headers,
        "X-Contentful-Version": String(version),
      },
    }
  );

  if (!activateRes.ok) {
    const err = await activateRes.json();
    console.error("Failed to activate:", JSON.stringify(err, null, 2));
    process.exit(1);
  }

  console.log("logoCarousel content type created and published.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
