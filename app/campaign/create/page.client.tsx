"use client";

import { EuiPageTemplate, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Campaign Create"
        description="Create a new campaign"
      />

      <EuiPageTemplate.Section>
        <EuiText>123</EuiText>
      </EuiPageTemplate.Section>
    </>
  );
}
