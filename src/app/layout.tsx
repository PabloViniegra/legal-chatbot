import type { Metadata } from "next";
import { Arvo, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { ThemeProvider } from "@/components/providers/theme-provider";

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

export const metadata: Metadata = {
  title: "LexIA - Asistente Legal IA",
  description: "Chatbot especializado en legislación española",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" suppressHydrationWarning>
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
