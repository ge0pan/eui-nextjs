"use client";

import { useServerInsertedHTML } from "next/navigation";

import { EuiProvider, EuiThemeProvider } from "@elastic/eui";
import createCache from "@emotion/cache";

export default function EuiProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = createCache({
    key: "eui",
    container: undefined,
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`css ${cache.key}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <EuiProvider cache={cache}>
      <EuiThemeProvider colorMode="light">{children}</EuiThemeProvider>
    </EuiProvider>
  );
}
