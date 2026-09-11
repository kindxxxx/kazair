import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { company, seo } from "@/data/company";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${company.shortName}`,
  },
  description: seo.description,
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: siteUrl,
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/images/hero-bg.jpg", width: 1600, height: 900, alt: company.headline }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#003755",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  description: seo.description,
  telephone: company.phone,
  email: company.email,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Рыскулова 130 А, этаж 2, офис 1",
    addressLocality: "Алматы",
    postalCode: "050034",
    addressCountry: "KZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <body className={`${inter.className} flex min-h-full flex-col bg-paper font-sans text-ink`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
