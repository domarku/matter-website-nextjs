import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import { getAssetUrl, getAssetAlt } from "@/lib/contentful";

interface RichTextProps {
  document: Document;
}

export default function RichText({ document }: RichTextProps) {
  const options = {
    renderNode: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const url = getAssetUrl(node.data.target);
        const alt = getAssetAlt(node.data.target);
        if (!url) return "";
        const optimized = `${url}?w=1200&q=80&fm=webp`;
        return `<img src="${optimized}" alt="${alt}" loading="lazy" />`;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [INLINES.HYPERLINK]: (node: any, next: any) => {
        const uri = node.data.uri;
        return `<a href="${uri}" target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`;
      },
    },
  };

  const html = documentToHtmlString(document, options);

  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />;
}
