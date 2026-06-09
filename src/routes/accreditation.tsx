import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/accreditation")({
  head: () => ({
    meta: [
      { title: "Accreditation & Affiliation — GTVC Boys KTS Haripur" },
      { name: "description", content: "GTVC Boys KTS Haripur is affiliated with KPBTE, KP TEVTA and NAVTTC, and recognized by Govt. of Khyber Pakhtunkhwa." },
      { property: "og:title", content: "Accreditation & Affiliation — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Official accreditations and affiliating bodies of GTVC Boys KTS Haripur." },
    ],
  }),
  component: AccreditationPage,
});

const bodies = [
  { name: "KP Board of Technical Education (KPBTE)", desc: "Affiliating body for all three-year Diploma of Associate Engineering (DAE) programs." },
  { name: "KP TEVTA", desc: "Administering authority — Khyber Pakhtunkhwa Technical Education & Vocational Training Authority." },
  { name: "NAVTTC", desc: "National Vocational & Technical Training Commission — recognition of short trade certificates." },
  { name: "Government of Khyber Pakhtunkhwa", desc: "Public-sector institution operating under the provincial government." },
];

function AccreditationPage() {
  return (
    <div>
      <PageHero title="Accreditation & Affiliation" subtitle="Official recognitions that make our certificates valued nationwide and overseas." />

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {bodies.map((b) => (
            <Card key={b.name}>
              <CardContent className="p-6 flex gap-4">
                <div className="rounded-lg bg-accent p-3 h-fit"><ShieldCheck className="h-7 w-7 text-primary" /></div>
                <div>
                  <h3 className="font-bold text-lg">{b.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-surface border border-border p-8">
          <h2 className="text-xl font-bold">Why this matters</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Our affiliations ensure that the diploma and certificates you earn at GTVC Boys KTS Haripur are
            recognized by employers across Pakistan and in overseas markets (Gulf, Saudi Arabia, Malaysia and beyond).
            Graduates are eligible for technician-grade positions in government departments, public-sector
            organizations, and the private sector.
          </p>
        </div>
      </section>
    </div>
  );
}
