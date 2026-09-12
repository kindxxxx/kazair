import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { JsonLd } from "@/components/JsonLd";
import { company, seo } from "@/data/company";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
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
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/images/hero-bg.webp", width: 1280, height: 720, alt: company.headline }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/images/hero-bg.webp"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#003755",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.name,
  description: seo.description,
  telephone: [company.phone, company.phone2],
  email: [company.email, company.email2],
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Рыскулова 130 А, этаж 2, офис 1",
    addressLocality: "Алматы",
    postalCode: "050034",
    addressCountry: "KZ",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: siteUrl,
  inLanguage: "ru-KZ",
  publisher: {
    "@type": "Organization",
    name: company.legalName,
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
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
