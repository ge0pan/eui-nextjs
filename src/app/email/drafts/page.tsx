import type { Metadata } from "next";

import PageClient from "./page.client";

export const metadata: Metadata = {
  title: "Email Drafts",
  description: "View your email drafts",
};

export default function Page() {
  return <PageClient />;
}
