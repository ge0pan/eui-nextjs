"use client";

import { EuiPageTemplate } from "@elastic/eui";

import { EmailTable } from "@/services/email/components/table";
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
        pageTitle="Email Review"
        description="Review and prioritize your emails"
      />

      <EuiPageTemplate.Section>
        <EmailTable emails={data} />
      </EuiPageTemplate.Section>
    </>
  );
}
