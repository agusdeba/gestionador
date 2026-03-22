import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
