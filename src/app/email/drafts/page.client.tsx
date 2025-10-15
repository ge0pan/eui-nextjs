"use client";

import { EuiCodeBlock, EuiPageTemplate } from "@elastic/eui";

import { useEmailsQuery } from "@/services/email/lib/query";

export default function PageClient() {
  const { data, isPending, error } = useEmailsQuery();

  if (isPending) {
    return (
      <EuiPageTemplate.EmptyPrompt
        iconType="loading"
        title={<h2>Loading</h2>}
        body={<p>Fetching data...</p>}
      />
    );
  }

  if (error) {
    return (
      <EuiPageTemplate.EmptyPrompt
        iconType="alert"
        title={<h2>Something went wrong</h2>}
        body={<p>Failed to fetch data</p>}
      />
    );
  }

  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Email Drafts"
        description="View your email drafts"
      />

      <EuiPageTemplate.Section>
        <EuiCodeBlock language="json">
          {JSON.stringify(data, null, 2)}
        </EuiCodeBlock>
      </EuiPageTemplate.Section>
    </>
  );
}
