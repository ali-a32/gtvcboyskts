import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, History } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GTVC Boys KTS Haripur" },
      { name: "description", content: "About GTVC Boys KTS Haripur: history, vision, mission, and message from the principal." },
      { property: "og:title", content: "About — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Our institution's mission, vision and history of technical education in Haripur." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHero title="About Our Institution" subtitle="A Government Technical & Vocational Centre committed to producing skilled professionals for Pakistan." />

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Government Technical & Vocational Centre (Boys) KTS Haripur is a public-sector institution operating
            under the Khyber Pakhtunkhwa Technical Education & Vocational Training Authority (KP TEVTA). The
            college serves the Hazara division and surrounding districts, offering DAE programs affiliated with
            the KP Board of Technical Education (KPBTE) and short KTS courses recognized by NAVTTC.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our purpose is simple: equip young men with industry-grade technical skills, ethical work habits and
            entrepreneurial confidence so they can find dignified employment at home or abroad, or start their own
            ventures.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><History className="h-6 w-6 text-primary" /> Our History</h2>
          <p className="text-muted-foreground leading-relaxed">
            Established to address Pakistan's growing need for technically trained manpower, GTVC Boys KTS Haripur
            has grown into a multi-trade institution graduating hundreds of diploma holders and short-course
            certified technicians every year. Alumni serve in WAPDA, NESPAK, FWO, OGDCL, the private construction
            industry, and overseas markets in the Gulf.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our Mission", body: "To deliver internationally benchmarked technical and vocational training that prepares students for productive employment and self-employment." },
            { icon: Eye, title: "Our Vision", body: "To be the leading technical institution of Hazara, recognized for excellence in skills training and industry collaboration." },
            { icon: Heart, title: "Our Values", body: "Integrity, discipline, hands-on learning, respect for craftsmanship, and unwavering commitment to student success." },
          ].map((v) => (
            <Card key={v.title}>
              <CardContent className="p-6">
                <v.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border p-8 md:p-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Message from the Principal</span>
          <h2 className="mt-2 text-2xl font-bold">"Skills are the foundation of a self-reliant Pakistan."</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Welcome to GTVC Boys KTS Haripur. We take pride in the discipline and dedication of our students and
            the quality of our faculty. Our workshops, computer labs and classrooms are designed to give students
            real, employable skills — not just theory. I invite every aspiring student of Haripur and the
            surrounding districts to join us and become part of Pakistan's technically skilled workforce.
          </p>
          <div className="mt-6 text-sm">
            <div className="font-semibold">Principal</div>
            <div className="text-muted-foreground">GTVC Boys KTS Haripur</div>
          </div>
        </div>
      </section>
    </div>
  );
}
