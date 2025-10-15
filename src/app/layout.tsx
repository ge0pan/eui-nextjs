import EuiProviderWrapper from "@/components/EuiProvider";
import QueryClientWrapper from "@/components/QueryClientProvider";

import LayoutClient from "./layout.client.dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientWrapper>
          <EuiProviderWrapper>
            <LayoutClient>{children}</LayoutClient>
          </EuiProviderWrapper>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
