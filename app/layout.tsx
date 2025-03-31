import { EuiProviderWrapper } from './components/EuiProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EuiProviderWrapper>
          {children}
        </EuiProviderWrapper>
      </body>
    </html>
  );
}
