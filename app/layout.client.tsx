"use client";

import { EuiPageTemplate, EuiSideNav } from "@elastic/eui";
import { useRouter } from "next/navigation";

function useGetLinkProps() {
  const router = useRouter();

  return (href: string) => ({
    href,
    onClick: (e: React.MouseEvent) => {
      if (e.metaKey || e.ctrlKey) {
        // Default behavior for opening in a new tab
        return;
      }

      e.preventDefault();

      router.push(href);
    },
  });
}

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getLinkProps = useGetLinkProps();

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
                    ...getLinkProps("/email/drafts"),
                  },
                  {
                    name: "Review",
                    id: "email-review",
                    ...getLinkProps("/email/review"),
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
                    ...getLinkProps("/campaign/create"),
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
