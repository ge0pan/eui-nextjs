"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  EuiFieldText,
  EuiInputPopover,
  EuiLoadingSpinner,
  EuiPageTemplate,
  EuiSelectable,
  EuiSpacer,
} from "@elastic/eui";

import { EmailTable } from "@/services/email/components/table";
import { Email } from "@/services/email/types";

// TODO: remove after upgrading to TS5.5
function intersection(a: Set<string>, b: Set<string>) {
  return new Set([...a].filter((i) => b.has(i)));
}

const getValuePrincipal = (selected: string[], all: string[]) => {
  if (selected.length === 0 || selected.length === all.length)
    return "All Audiences";
  return selected.join(" & ");
};

export default function PageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPrincipalFilterPopoverOpen, setIsPrincipalFilterPopoverOpen] =
    useState(false);
  const [allPrincipals, setAllPrincipals] = useState<string[]>([]);

  const principalFilterParam = (searchParams?.get("principal") || "").trim();
  const [principalFilter, setPrincipalFilterState] = useState<string[]>(
    principalFilterParam ? principalFilterParam.split(",") : [],
  );
  const setPrincipalFilter = useCallback(
    (value: string[]) => {
      const nextSearchParams = new URLSearchParams(searchParams || undefined);
      if (value.length === 0 || value.length === allPrincipals.length) {
        nextSearchParams.delete("principal");
      } else {
        nextSearchParams.set("principal", value.toString());
      }
      router.replace(`?${nextSearchParams}`);
      setPrincipalFilterState(value);
    },
    [searchParams, router, allPrincipals],
  );

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/emails");

        if (!response.ok) {
          setError(response.statusText);
          return;
        }

        const data = (await response.json()) as Email[];

        setEmails(data);

        const uniquePrincipals = new Set<string>();
        data.forEach((email) => {
          try {
            const audienceTargeting = JSON.parse(email.targeting) as {
              principals?: string[];
            };

            (audienceTargeting.principals || []).forEach((p) =>
              uniquePrincipals.add(p),
            );
          } catch {}
        });

        const list = Array.from(uniquePrincipals).sort();
        setAllPrincipals(list);

        if (!principalFilterParam) {
          setPrincipalFilterState(list);
        } else {
          const sanitized = principalFilterParam
            .split(",")
            .filter((p) => list.includes(p));
          setPrincipalFilterState(sanitized.length ? sanitized : list);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const filteredEmails = useMemo(
    () =>
      emails.filter(({ targeting }) => {
        const audienceTargeting = JSON.parse(targeting) as {
          principals?: string[];
        };

        const principals = audienceTargeting.principals || [];

        const matchesPrincipal =
          allPrincipals.length === 0 ||
          principalFilter.length === 0 ||
          intersection(new Set(principalFilter), new Set(principals)).size > 0;

        return matchesPrincipal;
      }),
    [emails, principalFilter, allPrincipals],
  );

  if (loading) {
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

  return (
    <>
      <EuiPageTemplate.Header
        pageTitle="Email Review"
        description="Review and prioritize your emails"
      />

      <EuiPageTemplate.Section>
        <EuiSelectable
          options={allPrincipals.map((p) => ({
            label: p,
            checked: principalFilter.includes(p) ? "on" : undefined,
          }))}
          listProps={{ bordered: true }}
          onChange={(options) => {
            const selected = options
              .filter((o) => o.checked === "on")
              .map((o) => o.label);
            setPrincipalFilter(selected);
          }}
        >
          {(list) => (
            <EuiInputPopover
              closePopover={() => setIsPrincipalFilterPopoverOpen(false)}
              disableFocusTrap
              closeOnScroll
              isOpen={isPrincipalFilterPopoverOpen}
              input={
                <EuiFieldText
                  readOnly
                  value={getValuePrincipal(principalFilter, allPrincipals)}
                  onClick={() => setIsPrincipalFilterPopoverOpen(true)}
                  prepend={"Filter by Principal"}
                />
              }
              panelPaddingSize="none"
            >
              {list}
            </EuiInputPopover>
          )}
        </EuiSelectable>

        <EuiSpacer size="m" />

        <EmailTable emails={filteredEmails} />
      </EuiPageTemplate.Section>
    </>
  );
}
