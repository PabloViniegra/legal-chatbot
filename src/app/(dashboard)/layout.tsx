import { AnimatedNavbar } from "@/components/layout/animated-navbar";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: "Chat Legal",
  description: "Consulta con nuestro asistente legal inteligente sobre legislación española. Obtén respuestas precisas sobre derecho civil, laboral, penal y mercantil.",
  path: "/",
  noIndex: true, // Protected route - no need to index for SEO
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <AnimatedNavbar />
      <main className="bg-background">{children}</main>
    </div>
  );
}
