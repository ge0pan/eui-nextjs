"use client";

import { EuiPageTemplate, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Email Drafts"
        description="View your email drafts"
      />

      <EuiPageTemplate.Section>
        <EuiText>123</EuiText>
      </EuiPageTemplate.Section>
    </>
  );
}
