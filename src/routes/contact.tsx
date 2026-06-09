import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — GTVC Boys KTS Haripur" },
      { name: "description", content: "Get in touch with GTVC Boys KTS Haripur — address, phone, email and campus location." },
      { property: "og:title", content: "Contact — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Reach the college administration." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHero title="Contact Us" subtitle="Visit our campus, call the office, or send us an email." />
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          {[
            { icon: MapPin, label: "Address", value: "KTS, Haripur, Khyber Pakhtunkhwa, Pakistan" },
            { icon: Phone, label: "Phone", value: "+92 (000) 000-0000" },
            { icon: Mail, label: "Email", value: "info@gtvcktshripur.edu.pk" },
            { icon: Clock, label: "Office Hours", value: "Mon – Fri, 8:00 AM – 3:00 PM" },
          ].map((c) => (
            <Card key={c.label}>
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="rounded-lg bg-accent p-3"><c.icon className="h-6 w-6 text-primary" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  <div className="font-semibold mt-1">{c.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden border border-border min-h-[400px]">
          <iframe
            title="Campus location"
            src="https://www.google.com/maps?q=Haripur,Pakistan&output=embed"
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
