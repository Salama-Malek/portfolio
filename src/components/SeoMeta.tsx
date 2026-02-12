import { useEffect } from "react";
import { defaultSeoMeta, DEFAULT_OG_IMAGE, SITE_URL, type SeoMeta } from "../utils/seo";

interface SeoMetaProps {
  meta?: SeoMeta;
}

const upsertMeta = (selector: string, attrs: Record<string, string>): void => {
  let meta = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => meta?.setAttribute(key, value));
    document.head.appendChild(meta);
    return;
  }

  Object.entries(attrs).forEach(([key, value]) => meta?.setAttribute(key, value));
};

const upsertCanonical = (href: string): void => {
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = href;
};

export default function SeoMeta({ meta = defaultSeoMeta }: SeoMetaProps): null {
  useEffect(() => {
    const payload = meta || defaultSeoMeta;
    const canonical = `${SITE_URL}${payload.canonicalPath}`;

    document.title = payload.title;
    upsertCanonical(canonical);

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: payload.description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: payload.keywords,
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: payload.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: payload.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonical,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: payload.ogType || "website",
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: DEFAULT_OG_IMAGE,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: payload.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: payload.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: DEFAULT_OG_IMAGE,
    });
  }, [meta]);

  return null;
}
