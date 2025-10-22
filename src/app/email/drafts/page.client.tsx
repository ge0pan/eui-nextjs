"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

import {
  EuiEmptyPrompt,
  EuiFlexGrid,
  EuiLoadingSpinner,
  EuiPageTemplate,
  EuiSpacer,
  EuiTabbedContent,
} from "@elastic/eui";

import { useUser } from "@/hooks/useUser";
import { EmailDraftCard } from "@/services/email/components/draft-card";
import { useEmailsQuery } from "@/services/email/lib/query";

export default function PageClient() {
  const user = useUser();

  const { data: drafts, isPending, error } = useEmailsQuery();

  const [selectedTab, setSelectedTab] = useQueryState("tab", {
    parse: (value) => (value === "myDrafts" ? "my" : value || "my"),
    serialize: (value) => (value === "my" ? "myDrafts" : value),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("tab")) {
      setSelectedTab("my");
    }
  }, [setSelectedTab]);

  const myDrafts = (drafts ?? []).filter((d) => d.owner.id === user.id);

  if (isPending) {
    return (
      <EuiPageTemplate.EmptyPrompt
        title={<EuiLoadingSpinner size="l" />}
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

  const tabs = [
    {
      id: "my",
      name: "My Drafts",
      content: (
        <>
          <EuiSpacer size="m" />
          {myDrafts.length > 0 ? (
            <EuiFlexGrid columns={2}>
              {myDrafts.map((draft) => (
                <EmailDraftCard key={draft.id} draft={draft} />
              ))}
            </EuiFlexGrid>
          ) : (
            <EuiEmptyPrompt title={<h3>No Drafts on My Drafts</h3>} />
          )}
        </>
      ),
    },
    {
      id: "global",
      name: "Global Drafts",
      content: (
        <>
          <EuiSpacer size="m" />
          {drafts.length > 0 ? (
            <EuiFlexGrid columns={2}>
              {drafts.map((draft) => (
                <EmailDraftCard key={draft.id} draft={draft} />
              ))}
            </EuiFlexGrid>
          ) : (
            <EuiEmptyPrompt title={<h3>No Global Drafts</h3>} />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Email Drafts"
        description="View your email drafts"
      />

      <EuiPageTemplate.Section>
        <EuiTabbedContent
          tabs={tabs}
          selectedTab={tabs.find((tab) => tab.id === selectedTab) || tabs[0]}
          onTabClick={(tab) => setSelectedTab(tab.id)}
        />
      </EuiPageTemplate.Section>
    </>
  );
}
