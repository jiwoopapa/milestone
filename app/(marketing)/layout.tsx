import { BaseLayout } from "@/components/templates/base-layout";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
