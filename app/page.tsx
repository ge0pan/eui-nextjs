"use client";

import {
  EuiButton,
  EuiCard,
  EuiFlexGrid,
  EuiPageHeader,
  EuiPageSection,
} from "@elastic/eui";

export default function Home() {
  return (
    <>
      <EuiPageHeader
        pageTitle="Welcome to Next.js with EUI"
        description="This is a sample page using Elastic UI components"
        paddingSize="l"
      />

      <EuiPageSection paddingSize="l" grow>
        <EuiFlexGrid columns={2} gutterSize="l">
          <EuiCard
            title="Getting Started"
            description="Learn how to use EUI components in your Next.js application."
            footer={
              <EuiButton
                fill
                href="https://elastic.github.io/eui/"
                target="_blank"
              >
                View EUI Docs
              </EuiButton>
            }
          />
          <EuiCard
            title="Next.js App Router"
            description="Learn about the new App Router features in Next.js."
            footer={
              <EuiButton fill href="https://nextjs.org/docs" target="_blank">
                View Next.js Docs
              </EuiButton>
            }
          />
        </EuiFlexGrid>
      </EuiPageSection>
    </>
  );
}
