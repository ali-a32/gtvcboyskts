import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Newspaper, Bell } from "lucide-react";
import { listPublishedNotices } from "@/lib/notices.functions";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — GTVC Boys KTS Haripur" },
      { name: "description", content: "Latest announcements, notices and upcoming events at GTVC Boys KTS Haripur." },
      { property: "og:title", content: "News & Events — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Notices, news and upcoming events." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const fetchNotices = useServerFn(listPublishedNotices);
  const { data, isLoading } = useQuery({ queryKey: ["notices", "all"], queryFn: () => fetchNotices() });
  const notices = data?.notices ?? [];

  return (
    <div>
      <PageHero title="News & Events" subtitle="Official notices, announcements and event updates from the college." />
      <section className="container mx-auto px-4 py-16">
        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : notices.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">
            No notices have been published yet. Please check back soon.
          </CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {notices.map((n) => (
              <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }}>
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="capitalize gap-1">
                        {n.category === "event" ? <Calendar className="h-3 w-3" /> : n.category === "news" ? <Newspaper className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                        {n.category}
                      </Badge>
                      <span>{new Date(n.published_at).toLocaleDateString()}</span>
                    </div>
                    <h2 className="mt-3 font-bold text-lg">{n.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{n.body}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
