import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/locale";
import { DynamicMetadata } from "@/components/DynamicMetadata";
import "./globals.css";

// Dynamic metadata based on locale
export async function generateMetadata(): Promise<Metadata> {
  // Default to English metadata, will be updated client-side
  const defaultMetadata = {
    title: "Bluggenn",
    description:
      "Bluggenn is a Saudi tech brand founded by passionate engineers with a love for smart, simple, and reliable designs.",
    generator: "Soft Masters",
  };

  const arabicMetadata = {
    title: "بلوجن",
    description:
      "بلوجن هي علامة تجارية سعودية تقنية تأسست على يد مهندسين شغوفين بحب التصاميم الذكية والبسيطة والموثوقة.",
    generator: "Soft Masters",
  };

  // For now, return default metadata
  // This will be enhanced with proper locale detection
  return defaultMetadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bluggenn is a Saudi tech brand founded by passionate engineers with a love for smart, simple, and reliable designs."
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Bluggenn" />
        <meta
          property="og:description"
          content="Bluggenn is a Saudi tech brand founded by passionate engineers with a love for smart, simple, and reliable designs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo-new.png" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bluggenn" />
        <meta
          name="twitter:description"
          content="Bluggenn is a Saudi tech brand founded by passionate engineers with a love for smart, simple, and reliable designs."
        />
        <meta name="twitter:image" content="/logo-new.png" />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="transition-all duration-300 antialiased font-sans">
        <LocaleProvider>
          <DynamicMetadata />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
