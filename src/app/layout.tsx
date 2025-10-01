import type { Metadata } from "next";
import { Arvo, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DEFAULT_METADATA } from "@/lib/seo.config";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateWebApplicationSchema,
  jsonLdScriptProps,
} from "@/lib/structured-data";

export const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Enhanced SEO metadata
export const metadata: Metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const webApplicationSchema = generateWebApplicationSchema();

  return (
    <ClerkProvider localization={esES}>
      <html lang="es" suppressHydrationWarning>
        <head>
          {/* JSON-LD Structured Data for SEO */}
          <script {...jsonLdScriptProps(organizationSchema)} />
          <script {...jsonLdScriptProps(websiteSchema)} />
          <script {...jsonLdScriptProps(webApplicationSchema)} />
        </head>
        <body
          className={`${arvo.variable} ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
