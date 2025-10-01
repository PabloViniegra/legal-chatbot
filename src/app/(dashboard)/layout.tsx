import { AnimatedNavbar } from "@/components/layout/animated-navbar";

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
