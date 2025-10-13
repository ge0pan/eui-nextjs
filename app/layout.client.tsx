"use client";

import { EuiPageTemplate, EuiSideNav } from "@elastic/eui";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <EuiPageTemplate
        panelled={true}
        bottomBorder={false}
        restrictWidth={true}
      >
        <EuiPageTemplate.Sidebar>
          <EuiSideNav
            items={[
              {
                id: "email",
                name: "Emails",
                items: [
                  {
                    name: "Drafts",
                    id: "email-draft",
                    href: "/email/drafts",
                  },
                  {
                    name: "Review",
                    id: "email-review",
                    href: "/email/review",
                  },
                ],
              },
              {
                id: "campaign",
                name: "Campaigns",
                items: [
                  {
                    name: "Create",
                    id: "campaign-create",
                    href: "/campaign/create",
                  },
                ],
              },
            ]}
          />
        </EuiPageTemplate.Sidebar>

        {children}
      </EuiPageTemplate>
    </div>
  );
}
