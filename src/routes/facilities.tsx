import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import workshopImg from "@/assets/facility-workshop.jpg";
import computerImg from "@/assets/facility-computer-lab.jpg";
import mechImg from "@/assets/facility-mechanical.jpg";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — GTVC Boys KTS Haripur" },
      { name: "description", content: "Modern workshops, computer labs, library and hostel facilities at GTVC Boys KTS Haripur." },
      { property: "og:title", content: "Facilities — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Workshops, labs, library and hostel — explore our facilities." },
      { property: "og:image", content: workshopImg },
    ],
  }),
  component: FacilitiesPage,
});

const items = [
  { title: "Electrical & Electronics Workshops", img: workshopImg, body: "Fully equipped electrical workshops with industry-grade machines, training panels, oscilloscopes and power lab equipment." },
  { title: "Modern Computer Labs", img: computerImg, body: "Multiple computer labs with high-speed internet for programming, networking, AutoCAD and IT courses." },
  { title: "Mechanical & Auto Workshops", img: mechImg, body: "Lathe machines, milling, fitting bays and complete auto workshop for engine, gear and chassis training." },
];

function FacilitiesPage() {
  return (
    <div>
      <PageHero title="Facilities" subtitle="Hands-on learning environments designed for skill mastery." />

      <section className="container mx-auto px-4 py-16 space-y-16">
        {items.map((it, i) => (
          <div key={it.title} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <img src={it.img} alt={it.title} width={1280} height={800} loading="lazy" className="rounded-xl border border-border w-full h-auto object-cover aspect-video" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{it.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{it.body}</p>
            </div>
          </div>
        ))}

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Library", d: "Technical books, journals, e-learning resources and quiet study areas." },
            { t: "Hostel", d: "On-campus residential facility for out-of-district students (subject to availability)." },
            { t: "Sports & Mosque", d: "Cricket ground, indoor sports and a campus mosque." },
          ].map((f) => (
            <div key={f.t} className="rounded-lg border border-border p-6 bg-card">
              <h3 className="font-bold text-lg text-primary">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
