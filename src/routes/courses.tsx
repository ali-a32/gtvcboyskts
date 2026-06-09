import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/programs";
import { Clock, Users, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses & Programs — GTVC Boys KTS Haripur" },
      { name: "description", content: "DAE programs (Civil, Electrical, Mechanical, Computer, Auto & Diesel) and KTS short courses offered at GTVC Boys KTS Haripur." },
      { property: "og:title", content: "Courses & Programs — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Browse DAE and KTS short courses offered at GTVC Boys KTS Haripur." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const dae = PROGRAMS.filter((p) => p.type === "DAE");
  const kts = PROGRAMS.filter((p) => p.type === "KTS");
  return (
    <div>
      <PageHero title="Courses & Programs" subtitle="Industry-aligned diplomas and short courses recognized by KPBTE, KP TEVTA and NAVTTC." />

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">DAE — Diploma of Associate Engineering (3 Years)</h2>
        <p className="text-muted-foreground mb-8">Affiliated with the Khyber Pakhtunkhwa Board of Technical Education.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dae.map((p) => <ProgramCard key={p.slug} p={p} />)}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-2">KTS — Short Courses (6 Months)</h2>
        <p className="text-muted-foreground mb-8">Recognized by KP TEVTA / NAVTTC. Ideal for quick employment & overseas placements.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {kts.map((p) => <ProgramCard key={p.slug} p={p} />)}
        </div>

        <div className="mt-16 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Ready to start your technical career?</h3>
            <p className="text-primary-foreground/90 mt-1">Applications are open for the current intake.</p>
          </div>
          <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/admissions">Apply Now</Link></Button>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({ p }: { p: typeof PROGRAMS[number] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <Badge variant="secondary">{p.type}</Badge>
        </div>
        <h3 className="mt-3 font-bold text-lg">{p.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground flex-1">{p.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.duration}</div>
          <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {p.seats} seats</div>
          <div className="col-span-2"><span className="font-medium text-foreground">Eligibility:</span> {p.eligibility}</div>
        </div>
      </CardContent>
    </Card>
  );
}
