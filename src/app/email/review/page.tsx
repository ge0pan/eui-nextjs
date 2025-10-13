import type { Metadata } from "next";

import PageClient from "./page.client";

export const metadata: Metadata = {
  title: "Email Review",
  description: "Review and prioritize your emails",
};

export default function Page() {
  return <PageClient />;
}
