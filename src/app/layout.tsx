import { EuiProviderWrapper } from "@/components/EuiProvider";
import LayoutClient from "./layout.client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EuiProviderWrapper>
          <LayoutClient>{children}</LayoutClient>
        </EuiProviderWrapper>
      </body>
    </html>
  );
}
