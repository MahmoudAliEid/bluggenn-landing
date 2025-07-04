"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/locale";

export function DynamicMetadata() {
  const { locale, t } = useLocale();

  useEffect(() => {
    // Update document title
    const title = t("metadata.title");
    document.title = title;

    // Update meta description
    const description = t("metadata.description");
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      // Create meta description if it doesn't exist
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update html lang and dir attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }
  }, [locale, t]);

  return null; // This component doesn't render anything
}
