"use client";

import { EuiPageHeader, EuiPageSection, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageHeader
        pageTitle="Email Review"
        description="Review and prioritize your emails"
        paddingSize="l"
      />

      <EuiPageSection paddingSize="l" grow>
        <EuiText>123</EuiText>
      </EuiPageSection>
    </>
  );
}
