# TrialGuard AI — Clinical Screening Workspace

## Goal
Create a polished, responsive clinical research operations dashboard at the home page. It will demonstrate protocol review, deterministic patient screening, PHI protection, uncertainty handling, and audit-ready evidence using clearly labeled synthetic data.

## Experience
- Build a fixed desktop operations sidebar that becomes a compact mobile header.
- Lead with an active protocol workspace rather than a marketing page.
- Show a concise operational overview: screened candidates, eligible matches, review queue, and protocol quality.
- Present a filterable patient screening queue with eligibility outcomes and selected-record detail.
- Include criterion-level pass, fail, and human-review evidence with protocol citations.
- Add a compact activity/audit panel and visible PHI-protection status.
- Make key interactions functional: queue filters, patient selection, tabs, dossier export feedback, and mobile navigation.

## Visual Direction
- Deep navy navigation, clinical blue actions, white and soft-gray working surfaces.
- Emerald, red, and amber reserved for decision states.
- Clean geometric typography, restrained gradients, subtle translucent surfaces, and compact data visualization.
- Dense but readable tables and panels, with small purposeful transitions.

## Technical Details
- Define the complete semantic color, typography, shadow, and motion system in the global stylesheet using OKLCH tokens.
- Implement the workspace as focused React components backed by synthetic local data.
- Use existing interface controls and Lucide icons; no backend or real patient data.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the primary workflow and responsive layouts in the running preview.
