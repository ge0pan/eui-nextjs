'use client';

import { EuiProvider, EuiThemeProvider } from "@elastic/eui";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from 'next/navigation';

export function EuiProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = createCache({
    key: 'eui',
    container: undefined
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`css ${cache.key}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' ')
      }}
    />
  ));

  return (
    <EuiProvider cache={cache}>
      <EuiThemeProvider colorMode="dark">
        {children}
      </EuiThemeProvider>
    </EuiProvider>
  );
}
