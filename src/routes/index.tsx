import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, Award, Users, Wrench, GraduationCap, Calendar, Bell, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-campus.jpg";
import { PROGRAMS } from "@/lib/programs";
import { listPublishedNotices } from "@/lib/notices.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GTVC Boys KTS Haripur — Government Technical College" },
      { name: "description", content: "Quality DAE and KTS technical education in Haripur, Pakistan. Modern workshops, qualified faculty, and industry-recognized accreditation." },
      { property: "og:title", content: "GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Quality DAE and KTS technical education in Haripur, Pakistan." },
    ],
  }),
  component: HomePage,
});

const featured = PROGRAMS.filter((p) => p.type === "DAE").slice(0, 4);

function HomePage() {
  const fetchNotices = useServerFn(listPublishedNotices);
  const { data } = useQuery({ queryKey: ["notices", "home"], queryFn: () => fetchNotices() });
  const notices = (data?.notices ?? []).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="GTVC campus" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/80 to-primary/40" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-primary-foreground">
          <Badge className="bg-gold text-gold-foreground hover:bg-gold mb-4">Admissions Open 2026</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Building Pakistan's Skilled Workforce, One Student at a Time.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
            Government Technical & Vocational Centre (Boys), KTS Haripur — offering DAE programs and KTS short courses
            with modern workshops and qualified faculty.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/admissions">Apply for Admission <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10">
              <Link to="/courses">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-surface border-y border-border">
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "1,200+", l: "Students Enrolled" },
            { n: "8", l: "Technology Programs" },
            { n: "45+", l: "Qualified Faculty" },
            { n: "25+", l: "Industry Partners" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="container mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">About the College</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">A government institution committed to technical excellence.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            GTVC Boys KTS Haripur is a Government Technical & Vocational Centre established to train young men of
            Khyber Pakhtunkhwa in the trades and technologies that power Pakistan's industry. We operate under
            KP TEVTA and offer affiliated DAE programs alongside short KTS courses.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Affiliated with KP Board of Technical Education (KPBTE)",
              "Recognized by NAVTTC and KP TEVTA",
              "Equipped workshops and modern computer labs",
              "Faculty with industry & teaching experience",
            ].map((x) => (
              <li key={x} className="flex gap-3"><Award className="h-5 w-5 text-gold shrink-0" /> {x}</li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-8"><Link to="/about">Learn more about us</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: GraduationCap, title: "DAE Programs", desc: "3-year diplomas" },
            { icon: Wrench, title: "KTS Courses", desc: "6-month skills" },
            { icon: BookOpen, title: "Modern Labs", desc: "Hands-on training" },
            { icon: Users, title: "Career Support", desc: "Industry linkages" },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-card p-5">
              <f.icon className="h-8 w-8 text-primary" />
              <div className="mt-3 font-semibold">{f.title}</div>
              <div className="text-sm text-muted-foreground">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="bg-surface py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-end gap-4 mb-10">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Programs</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Diploma of Associate Engineering</h2>
            </div>
            <Button asChild variant="outline"><Link to="/courses">View all courses</Link></Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <Card key={p.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary">{p.type}</Badge>
                  <h3 className="mt-3 font-bold text-lg leading-snug">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                  <div className="mt-4 text-xs text-muted-foreground flex justify-between">
                    <span>{p.duration}</span><span>{p.seats} seats</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICES + CTA */}
      <section className="container mx-auto px-4 py-16 md:py-20 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Latest Notices & News</h2>
            <Button asChild variant="link" className="text-primary"><Link to="/news">View all</Link></Button>
          </div>
          {notices.length === 0 ? (
            <Card><CardContent className="p-6 text-sm text-muted-foreground">No notices yet — admins can publish announcements from the dashboard.</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {notices.map((n) => (
                <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }}>
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="p-5 flex gap-4 items-start">
                      <div className="rounded-md bg-accent p-2 text-accent-foreground">
                        {n.category === "event" ? <Calendar className="h-5 w-5" /> : n.category === "news" ? <Newspaper className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 items-center text-xs text-muted-foreground">
                          <Badge variant="outline" className="capitalize">{n.category}</Badge>
                          <span>{new Date(n.published_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="mt-1 font-semibold">{n.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <aside>
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark text-primary-foreground p-8">
            <h3 className="text-2xl font-bold">Admissions Open</h3>
            <p className="mt-2 text-primary-foreground/90 text-sm">
              Applications are being accepted for DAE and KTS programs. Submit your application online today.
            </p>
            <Button asChild className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/admissions">Apply Online</Link>
            </Button>
            <Button asChild variant="link" className="w-full mt-2 text-primary-foreground">
              <Link to="/downloads">Download Prospectus</Link>
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
