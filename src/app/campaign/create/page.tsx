import type { Metadata } from "next";
import PageClient from "./page.client";

export const metadata: Metadata = {
  title: "Campaign Create",
  description: "Create a new campaign",
};

export default function Page() {
  return <PageClient />;
}
