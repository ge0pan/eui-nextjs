"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EuiLoadingSpinner, EuiPageTemplate } from "@elastic/eui";

import { EmailTable } from "@/services/email/components/table";
import { Email } from "@/services/email/types";

export default function PageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
        <EmailTable emails={emails} />
      </EuiPageTemplate.Section>
    </>
  );
}
