import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageHero } from "@/components/site/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getNoticeBySlug } from "@/lib/notices.functions";

export const Route = createFileRoute("/news/$slug")({
  head: () => ({
    meta: [
      { title: "Notice — GTVC Boys KTS Haripur" },
      { name: "description", content: "Official notice from GTVC Boys KTS Haripur." },
    ],
  }),
  component: NoticeDetail,
  errorComponent: ({ error }) => <div className="container mx-auto px-4 py-16">Error: {error.message}</div>,
  notFoundComponent: () => <div className="container mx-auto px-4 py-16">Notice not found.</div>,
});

function NoticeDetail() {
  const { slug } = Route.useParams();
  const fetchOne = useServerFn(getNoticeBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["notice", slug],
    queryFn: () => fetchOne({ data: { slug } }),
  });

  if (isLoading) return <div className="container mx-auto px-4 py-16">Loading…</div>;
  if (!data?.notice) return <div className="container mx-auto px-4 py-16">
    <Button asChild variant="link"><Link to="/news"><ArrowLeft className="h-4 w-4 mr-1" /> Back to news</Link></Button>
    <p className="mt-4 text-muted-foreground">This notice could not be found.</p>
  </div>;

  const n = data.notice;
  return (
    <div>
      <PageHero title={n.title}>
        <div className="mt-4 flex gap-3 items-center text-primary-foreground/80 text-sm">
          <Badge className="bg-gold text-gold-foreground capitalize">{n.category}</Badge>
          <span>{new Date(n.published_at).toLocaleDateString()}</span>
        </div>
      </PageHero>
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Button asChild variant="link" className="px-0 mb-6"><Link to="/news"><ArrowLeft className="h-4 w-4 mr-1" /> Back to all news</Link></Button>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap leading-relaxed text-foreground">{n.body}</div>
      </article>
    </div>
  );
}
