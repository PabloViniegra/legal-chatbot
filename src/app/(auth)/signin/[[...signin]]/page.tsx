import { SignIn } from "@clerk/nextjs";
import { Scale } from "lucide-react";
import { AnimatedAuthWrapper } from "@/components/auth/animated-auth-wrapper";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";

export const metadata: Metadata = generatePageMetadata({
  title: "Iniciar Sesión",
  description: "Accede a LexIA, tu asistente legal inteligente especializado en legislación española. Consulta tus dudas legales con inteligencia artificial.",
  path: "/signin",
});

export default function SignInPage() {
  return (
    <AnimatedAuthWrapper
      logo={
        <div className="bg-primary p-4 rounded-2xl shadow-lg">
          <Scale className="w-12 h-12 text-primary-foreground" />
        </div>
      }
      title="LexIA"
      subtitle="Asistente Legal con IA"
    >
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card shadow-lg border border-border rounded-lg",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            formFieldInput: "bg-background border-input text-foreground",
            footerActionLink: "text-primary hover:text-primary/80",
            identityPreviewText: "text-foreground",
            identityPreviewEditButton: "text-primary",
          },
        }}
      />
    </AnimatedAuthWrapper>
  );
}
