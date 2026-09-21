import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Filter,
  FlaskConical,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Status = "Eligible" | "Ineligible" | "Needs review";

type Patient = {
  id: string;
  initials: string;
  age: number;
  sex: string;
  status: Status;
  score: number;
  passed: number;
  failed: number;
  review: number;
  screened: string;
  diagnosis: string;
};

const patients: Patient[] = [
  { id: "SYN-0241", initials: "MK", age: 58, sex: "F", status: "Eligible", score: 94, passed: 11, failed: 0, review: 1, screened: "2 min ago", diagnosis: "Stage III NSCLC" },
  { id: "SYN-0238", initials: "JR", age: 66, sex: "M", status: "Needs review", score: 76, passed: 9, failed: 0, review: 3, screened: "18 min ago", diagnosis: "Stage IV NSCLC" },
  { id: "SYN-0234", initials: "AL", age: 72, sex: "F", status: "Ineligible", score: 42, passed: 8, failed: 2, review: 2, screened: "34 min ago", diagnosis: "Stage III NSCLC" },
  { id: "SYN-0229", initials: "DT", age: 51, sex: "M", status: "Eligible", score: 91, passed: 10, failed: 0, review: 2, screened: "1 hr ago", diagnosis: "Stage IV NSCLC" },
  { id: "SYN-0227", initials: "PS", age: 63, sex: "F", status: "Needs review", score: 71, passed: 9, failed: 0, review: 3, screened: "2 hr ago", diagnosis: "Stage III NSCLC" },
];

const filters: Array<"All" | Status> = ["All", "Eligible", "Needs review", "Ineligible"];

const statusStyles: Record<Status, string> = {
  Eligible: "bg-success-soft text-success border-success/20",
  Ineligible: "bg-danger-soft text-danger border-danger/20",
  "Needs review": "bg-warning-soft text-warning border-warning/20",
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground shadow-brand">
        <ShieldCheck className="size-5" strokeWidth={2.25} />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-success ring-2 ring-sidebar" />
      </div>
      {!compact && (
        <div>
          <div className="text-[15px] font-bold leading-none text-sidebar-foreground">TrialGuard <span className="text-brand-bright">AI</span></div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-sidebar-muted">Clinical intelligence</div>
        </div>
      )}
    </div>
  );
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Protocols", icon: FileText, count: "3" },
  { label: "Patient screening", icon: Users, active: true, count: "12" },
  { label: "Audit dossiers", icon: ClipboardCheck },
  { label: "Activity log", icon: Activity },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-[72px] items-center justify-between border-b border-sidebar-border px-5">
        <BrandMark />
        <Button variant="ghost" size="icon" className="text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden" onClick={onClose} aria-label="Close navigation"><X /></Button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Primary navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-muted">Workspace</p>
        {navItems.map((item) => (
          <button key={item.label} onClick={onClose} className={cn("flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium transition-colors", item.active ? "bg-sidebar-accent text-sidebar-primary-foreground" : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")}>
            <item.icon className="size-4" />
            <span className="flex-1">{item.label}</span>
            {item.count && <span className={cn("min-w-5 rounded px-1.5 py-0.5 text-center text-[10px]", item.active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-sidebar-accent text-sidebar-muted")}>{item.count}</span>}
          </button>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground">PHI Shield active</p>
            <p className="mt-1 text-[11px] leading-4 text-sidebar-muted">De-identification controls enforced</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-1">
          <div className="grid size-8 place-items-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground">VD</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">Vedant Dalvi</p>
            <p className="truncate text-[11px] text-sidebar-muted">Clinical reviewer</p>
          </div>
          <MoreHorizontal className="size-4 text-sidebar-muted" />
        </div>
      </div>
    </aside>
  );
}

function StatusPill({ status }: { status: Status }) {
  const Icon = status === "Eligible" ? CheckCircle2 : status === "Ineligible" ? XCircle : Clock3;
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", statusStyles[status])}><Icon className="size-3.5" />{status}</span>;
}

function MetricCard({ label, value, detail, icon: Icon, tone = "brand" }: { label: string; value: string; detail: string; icon: typeof Users; tone?: "brand" | "success" | "warning" | "neutral" }) {
  const tones = { brand: "bg-primary-soft text-primary", success: "bg-success-soft text-success", warning: "bg-warning-soft text-warning", neutral: "bg-muted text-muted-foreground" };
  return (
    <div className="surface-panel group p-4 transition-all hover:-translate-y-0.5 hover:shadow-panel">
      <div className="flex items-start justify-between">
        <div><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{value}</p></div>
        <span className={cn("grid size-9 place-items-center rounded-lg", tones[tone])}><Icon className="size-4" /></span>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">{detail}</p>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="relative grid size-10 place-items-center rounded-full" style={{ background: `conic-gradient(var(--primary) ${score * 3.6}deg, var(--muted) 0deg)` }}>
      <div className="grid size-8 place-items-center rounded-full bg-card text-[11px] font-bold text-foreground">{score}</div>
    </div>
  );
}

function PatientTable({ selected, onSelect }: { selected: Patient; onSelect: (patient: Patient) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left">
        <thead><tr className="border-b border-border bg-muted/50 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"><th className="px-4 py-3">Patient</th><th className="px-3 py-3">Result</th><th className="px-3 py-3">Confidence</th><th className="px-3 py-3">Criteria</th><th className="px-3 py-3">Screened</th><th className="px-3 py-3" /></tr></thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} onClick={() => onSelect(patient)} className={cn("cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-primary-soft/40", selected.id === patient.id && "bg-primary-soft/60")}>
              <td className="px-4 py-3.5"><div className="flex items-center gap-3"><div className="grid size-8 place-items-center rounded-md bg-secondary text-[11px] font-bold text-secondary-foreground">{patient.initials}</div><div><p className="text-xs font-semibold text-foreground">{patient.id}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{patient.age} yrs · {patient.sex} · {patient.diagnosis}</p></div></div></td>
              <td className="px-3 py-3.5"><StatusPill status={patient.status} /></td>
              <td className="px-3 py-3.5"><div className="flex items-center gap-2"><ScoreRing score={patient.score} /><span className="text-[11px] text-muted-foreground">High</span></div></td>
              <td className="px-3 py-3.5"><div className="flex items-center gap-2 text-[11px] font-semibold"><span className="text-success">{patient.passed} pass</span>{patient.failed > 0 && <span className="text-danger">{patient.failed} fail</span>}<span className="text-warning">{patient.review} review</span></div></td>
              <td className="px-3 py-3.5 text-[11px] text-muted-foreground">{patient.screened}</td>
              <td className="px-3 py-3.5"><Button variant="ghost" size="icon" aria-label={`Open ${patient.id}`}><MoreHorizontal /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const criteria = [
  { id: "I-01", title: "Histologically confirmed NSCLC", evidence: "Pathology report confirms lung adenocarcinoma.", source: "Protocol §4.1.1 · Pathology, 12 Aug 2026", state: "pass" },
  { id: "I-03", title: "Age 18 years or older", evidence: "Synthetic record age: 58 years.", source: "Protocol §4.1.3 · Demographics", state: "pass" },
  { id: "I-05", title: "ECOG performance status 0–1", evidence: "Most recent ECOG assessment recorded as 1.", source: "Protocol §4.1.5 · Oncology note, 18 Sep 2026", state: "pass" },
  { id: "E-07", title: "No active CNS metastases", evidence: "Brain MRI noted a 3 mm indeterminate focus; clinical significance unclear.", source: "Protocol §4.2.7 · MRI report, 06 Sep 2026", state: "review" },
];

function ReviewPanel({ patient, onExport }: { patient: Patient; onExport: () => void }) {
  return (
    <section className="surface-panel overflow-hidden">
      <div className="border-b border-border p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><div className="flex items-center gap-2"><h2 className="text-base font-bold text-foreground">Eligibility review</h2><span className="rounded bg-muted px-2 py-1 font-mono text-[10px] font-semibold text-muted-foreground">{patient.id}</span></div><p className="mt-1 text-xs text-muted-foreground">Evidence mapped to protocol version 3.2</p></div>
          <div className="flex items-center gap-2"><StatusPill status={patient.status} /><Button variant="outline" size="sm" onClick={onExport}><Download />Export dossier</Button></div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[{ n: patient.passed, l: "Passed", c: "text-success" }, { n: patient.failed, l: "Failed", c: "text-danger" }, { n: patient.review, l: "Review", c: "text-warning" }, { n: `${patient.score}%`, l: "Confidence", c: "text-primary" }].map((item) => <div key={item.l} className="rounded-md border border-border bg-muted/30 px-3 py-2.5"><p className={cn("text-lg font-bold", item.c)}>{item.n}</p><p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{item.l}</p></div>)}
        </div>
      </div>
      <Tabs defaultValue="criteria">
        <TabsList className="h-auto w-full justify-start rounded-none border-b border-border bg-card px-5 py-0">
          <TabsTrigger value="criteria" className="rounded-none border-b-2 border-transparent px-1 py-3.5 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:shadow-none">Criteria evidence</TabsTrigger>
          <TabsTrigger value="contradictions" className="rounded-none border-b-2 border-transparent px-4 py-3.5 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:shadow-none">Contradictions <span className="ml-1 rounded-full bg-warning-soft px-1.5 text-[10px] text-warning">1</span></TabsTrigger>
          <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent px-4 py-3.5 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:shadow-none">Audit trail</TabsTrigger>
        </TabsList>
        <TabsContent value="criteria" className="m-0 divide-y divide-border">
          {criteria.map((criterion) => {
            const review = criterion.state === "review";
            return <div key={criterion.id} className="flex gap-3 p-4 transition-colors hover:bg-muted/30"><span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", review ? "bg-warning-soft text-warning" : "bg-success-soft text-success")}>{review ? <CircleHelp className="size-3.5" /> : <Check className="size-3.5" />}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[10px] font-semibold text-muted-foreground">{criterion.id}</span><p className="text-xs font-semibold text-foreground">{criterion.title}</p></div><p className="mt-1 text-[11px] leading-5 text-muted-foreground">{criterion.evidence}</p><div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-primary"><FileText className="size-3" />{criterion.source}</div></div></div>;
          })}
        </TabsContent>
        <TabsContent value="contradictions" className="m-0 p-5"><div className="rounded-md border border-warning/25 bg-warning-soft p-4"><div className="flex gap-3"><CircleHelp className="mt-0.5 size-4 shrink-0 text-warning" /><div><p className="text-xs font-semibold text-foreground">Imaging finding requires clinical interpretation</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">The radiology report and oncology assessment differ on whether the 3 mm focus represents active CNS disease.</p></div></div></div></TabsContent>
        <TabsContent value="timeline" className="m-0 space-y-4 p-5">{["Patient record de-identified", "12 rules evaluated deterministically", "Evidence citations locked"].map((item, i) => <div key={item} className="flex items-center gap-3 text-xs"><span className="grid size-6 place-items-center rounded-full bg-primary-soft text-primary"><Check className="size-3" /></span><span className="font-medium text-foreground">{item}</span><span className="ml-auto text-[10px] text-muted-foreground">10:{42 + i * 2}</span></div>)}</TabsContent>
      </Tabs>
    </section>
  );
}

export function TrialGuardDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Patient>(() => {
    const initialPatient = patients[0];
    if (!initialPatient) throw new Error("Synthetic screening queue is empty");
    return initialPatient;
  });
  const [notice, setNotice] = useState("");
  const visiblePatients = useMemo(() => filter === "All" ? patients : patients.filter((patient) => patient.status === filter), [filter]);

  const exportDossier = () => {
    setNotice(`Audit dossier prepared for ${selected.id}`);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      {mobileOpen && <button className="fixed inset-0 z-40 bg-overlay lg:hidden" aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} />}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6">
          <Button variant="ghost" size="icon" className="mr-3 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></Button>
          <div className="lg:hidden"><BrandMark compact /></div>
          <div className="hidden min-w-0 flex-1 lg:block"><p className="text-xs font-medium text-muted-foreground">Good morning, Vedant</p><h1 className="mt-0.5 truncate text-lg font-bold tracking-tight">Patient screening workspace</h1></div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-success/20 bg-success-soft px-3 py-2 text-[11px] font-semibold text-success sm:flex"><span className="size-1.5 rounded-full bg-success pulse-dot" />System operational</div>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" /></Button>
            <Button size="sm" onClick={() => setNotice("New screening workflow opened")}><Sparkles />New screening</Button>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6">
          <section className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">Active protocol</span><span className="text-[11px] text-muted-foreground">Last synchronized 4 min ago</span></div><h2 className="text-xl font-bold tracking-tight sm:text-2xl">TG-NSCLC-301 <span className="font-medium text-muted-foreground">/ Phase III</span></h2><p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">Randomized study of TG-401 in previously untreated advanced non-small cell lung cancer</p></div>
            <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-soft"><div className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary"><FileCheck2 className="size-4" /></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Protocol integrity</p><div className="mt-1 flex items-center gap-3"><Progress value={92} className="h-1.5 w-24" /><span className="text-xs font-bold">92%</span><span className="text-[10px] text-success">Validated</span></div></div><ChevronDown className="size-4 text-muted-foreground" /></div>
          </section>

          <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <MetricCard label="Candidates screened" value="247" detail="+18 in the last 7 days" icon={Users} />
            <MetricCard label="Eligible matches" value="68" detail="27.5% eligibility rate" icon={CheckCircle2} tone="success" />
            <MetricCard label="Needs review" value="12" detail="4 high-priority cases" icon={Clock3} tone="warning" />
            <MetricCard label="Criteria coverage" value="96%" detail="48 of 50 rules structured" icon={FlaskConical} tone="neutral" />
          </section>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(370px,0.65fr)]">
            <section className="surface-panel min-w-0 overflow-hidden">
              <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div><h2 className="text-sm font-bold">Screening queue</h2><p className="mt-1 text-[11px] text-muted-foreground">Synthetic, de-identified candidate records</p></div>
                <div className="flex items-center gap-2"><div className="relative hidden sm:block"><Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" /><input className="h-9 w-44 rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none transition-shadow focus:ring-2 focus:ring-ring/30" placeholder="Search patient ID" /></div><Button variant="outline" size="sm"><Filter />Filters</Button></div>
              </div>
              <div className="flex gap-1 overflow-x-auto border-b border-border px-4 py-2">
                {filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={cn("whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors", filter === item ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>{item}{item !== "All" && <span className="ml-1.5 opacity-70">{patients.filter((p) => p.status === item).length}</span>}</button>)}
              </div>
              {visiblePatients.length ? <PatientTable selected={selected} onSelect={setSelected} /> : <div className="p-10 text-center text-xs text-muted-foreground">No patients match this filter.</div>}
              <div className="flex items-center justify-between border-t border-border px-4 py-3 text-[10px] text-muted-foreground"><span>Showing {visiblePatients.length} of 247 candidates</span><span>Rules engine v2.4.1</span></div>
            </section>
            <ReviewPanel patient={selected} onExport={exportDossier} />
          </div>

          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="surface-panel p-4"><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold">Screening activity</h2><p className="mt-1 text-[11px] text-muted-foreground">7-day decision volume</p></div><span className="text-[10px] font-medium text-muted-foreground">Sep 15–21, 2026</span></div><div className="mt-5 flex h-24 items-end gap-2">{[45, 70, 54, 88, 64, 92, 76].map((height, i) => <div key={i} className="group flex flex-1 flex-col items-center gap-2"><div className="w-full max-w-12 rounded-t-sm bg-primary-soft transition-colors group-hover:bg-primary" style={{ height: `${height}%` }} /><span className="text-[9px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span></div>)}</div></div>
            <div className="surface-panel p-4"><div className="flex items-center justify-between"><h2 className="text-sm font-bold">Governance status</h2><ShieldCheck className="size-4 text-success" /></div><div className="mt-4 space-y-3">{[["PHI protection", "Active"], ["Evidence retention", "7 years"], ["Last rules validation", "Today"]].map(([label, value]) => <div key={label} className="flex items-center justify-between border-b border-border pb-2.5 last:border-0"><span className="text-[11px] text-muted-foreground">{label}</span><span className="text-[11px] font-semibold text-foreground">{value}</span></div>)}</div></div>
          </section>
        </main>
      </div>
      {notice && <div role="status" className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-md bg-foreground px-4 py-3 text-xs font-semibold text-background shadow-panel"><CheckCircle2 className="size-4 text-success" />{notice}</div>}
    </div>
  );
}