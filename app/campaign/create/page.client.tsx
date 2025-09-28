"use client";

import { EuiPageHeader, EuiPageSection, EuiText } from "@elastic/eui";

export default function PageClient() {
  return (
    <>
      <EuiPageHeader
        pageTitle="Campaign Create"
        description="Create a new campaign"
        paddingSize="l"
      />

      <EuiPageSection paddingSize="l" grow>
        <EuiText>123</EuiText>
      </EuiPageSection>
    </>
  );
}
