import { createFileRoute } from "@tanstack/react-router";
import { TrialGuardDashboard } from "@/components/trialguard-dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patient Screening Workspace — TrialGuard AI" },
      { name: "description", content: "Governed clinical trial patient screening with deterministic eligibility evidence and audit-ready review." },
      { property: "og:title", content: "Patient Screening Workspace — TrialGuard AI" },
      { property: "og:description", content: "Governed clinical trial patient screening with deterministic eligibility evidence and audit-ready review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrialGuardDashboard,
});
