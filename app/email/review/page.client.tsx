"use client";

import { EuiPageTemplate, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Email Review"
        description="Review and prioritize your emails"
      />

      <EuiPageTemplate.Section>
        <EuiText>123</EuiText>
      </EuiPageTemplate.Section>
    </>
  );
}
