import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — GTVC Boys KTS Haripur" },
      { name: "description", content: "Download admission forms, prospectus, fee structure and syllabus PDFs for GTVC Boys KTS Haripur." },
      { property: "og:title", content: "Downloads — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Prospectus, admission forms and syllabus downloads." },
    ],
  }),
  component: DownloadsPage,
});

const downloads = [
  { title: "College Prospectus 2026", desc: "Complete programs, fees and admission information.", category: "Admissions" },
  { title: "Admission Application Form", desc: "Printable PDF admission form.", category: "Admissions" },
  { title: "Fee Structure", desc: "Latest fee structure for DAE and KTS programs.", category: "Fees" },
  { title: "DAE Syllabus (KPBTE)", desc: "Detailed syllabus for all DAE technologies.", category: "Academics" },
  { title: "Academic Calendar", desc: "Term dates, holidays and examination schedule.", category: "Academics" },
  { title: "Hostel Rules", desc: "Rules and application procedure for hostel residence.", category: "Hostel" },
];

function DownloadsPage() {
  return (
    <div>
      <PageHero title="Downloads" subtitle="Forms, prospectus and reference documents in one place." />
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {downloads.map((d) => (
            <Card key={d.title}>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="rounded-lg bg-accent p-3"><FileText className="h-6 w-6 text-primary" /></div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{d.category}</div>
                  <h3 className="font-bold mt-1">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                </div>
                <Button size="sm" variant="outline" disabled><FileDown className="h-4 w-4 mr-1" /> Soon</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground text-center">
          Documents will be uploaded by the college administration. Admins can manage downloads from the dashboard.
        </p>
      </section>
    </div>
  );
}
