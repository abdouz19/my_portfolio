import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { siteMetadata } from "@/lib/constants/site-metadata";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.canonicalUrl,
    siteName: "MAZ Portfolio",
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  metadataBase: new URL(siteMetadata.canonicalUrl),
  alternates: {
    canonical: siteMetadata.canonicalUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Abderraouf Zouaid",
  jobTitle: "Flutter Mobile Developer",
  url: siteMetadata.canonicalUrl,
  email: "mohamedabderraouf.zouaid.lp1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Algiers",
    addressCountry: "DZ",
  },
  sameAs: [
    "https://github.com/maz-zouaid",
    "https://linkedin.com/in/maz-zouaid",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeProvider>
          <a href="#hero" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
