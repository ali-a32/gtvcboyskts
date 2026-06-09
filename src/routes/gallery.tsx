import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import workshopImg from "@/assets/facility-workshop.jpg";
import computerImg from "@/assets/facility-computer-lab.jpg";
import mechImg from "@/assets/facility-mechanical.jpg";
import hero from "@/assets/hero-campus.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — GTVC Boys KTS Haripur" },
      { name: "description", content: "Campus, workshops, events and activity photos from GTVC Boys KTS Haripur." },
      { property: "og:title", content: "Gallery — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Browse campus and event photos from GTVC Boys KTS Haripur." },
      { property: "og:image", content: hero },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: hero, alt: "Campus building" },
  { src: workshopImg, alt: "Electrical workshop" },
  { src: computerImg, alt: "Computer lab" },
  { src: mechImg, alt: "Mechanical workshop" },
  { src: hero, alt: "College front" },
  { src: workshopImg, alt: "Training session" },
];

function GalleryPage() {
  return (
    <div>
      <PageHero title="Gallery" subtitle="Moments from our campus, classrooms, workshops and events." />
      <section className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-border group">
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">More photos and event coverage will be added regularly.</p>
      </section>
    </div>
  );
}
