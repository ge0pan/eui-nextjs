"use client";

import { EuiPageHeader, EuiPageSection, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageHeader
        pageTitle="Email Drafts"
        description="View your email drafts"
        paddingSize="l"
      />

      <EuiPageSection paddingSize="l" grow>
        <EuiText>123</EuiText>
      </EuiPageSection>
    </>
  );
}
