import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, LogOut } from "lucide-react";
import {
  checkIsAdmin, createNotice, deleteNotice,
  listAllNoticesAdmin, listApplicationsAdmin,
} from "@/lib/notices.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — GTVC Boys KTS Haripur" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const check = useServerFn(checkIsAdmin);
  const listN = useServerFn(listAllNoticesAdmin);
  const listA = useServerFn(listApplicationsAdmin);
  const createN = useServerFn(createNotice);
  const delN = useServerFn(deleteNotice);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/auth" });
      else { setUserEmail(data.session.user.email ?? null); setAuthChecked(true); }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const adminQ = useQuery({ queryKey: ["isAdmin"], queryFn: () => check(), enabled: authChecked });
  const noticesQ = useQuery({ queryKey: ["admin-notices"], queryFn: () => listN(), enabled: !!adminQ.data?.isAdmin });
  const appsQ = useQuery({ queryKey: ["admin-apps"], queryFn: () => listA(), enabled: !!adminQ.data?.isAdmin });

  async function signOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/" });
  }

  if (!authChecked || adminQ.isLoading) {
    return <div className="container mx-auto px-4 py-16">Loading…</div>;
  }
  if (!adminQ.data?.isAdmin) {
    return (
      <div>
        <PageHero title="Access Denied" subtitle="Your account does not have admin privileges." />
        <div className="container mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Signed in as <strong>{userEmail}</strong>. To grant admin access, run in the database:
          </p>
          <pre className="bg-surface border border-border p-4 rounded-md text-xs text-left max-w-2xl mx-auto overflow-x-auto">
{`INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = '${userEmail}';`}
          </pre>
          <Button onClick={signOut} variant="outline"><LogOut className="h-4 w-4 mr-2" /> Sign Out</Button>
        </div>
      </div>
    );
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title"));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    try {
      await createN({
        data: {
          title,
          slug: slug + "-" + Date.now().toString(36),
          body: String(fd.get("body")),
          category: fd.get("category") as any,
          is_published: true,
          event_date: fd.get("event_date") ? String(fd.get("event_date")) : null,
        },
      });
      toast.success("Notice published");
      (e.target as HTMLFormElement).reset();
      qc.invalidateQueries({ queryKey: ["admin-notices"] });
      qc.invalidateQueries({ queryKey: ["notices"] });
    } catch (err: any) { toast.error(err?.message ?? "Failed"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notice?")) return;
    try {
      await delN({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-notices"] });
      qc.invalidateQueries({ queryKey: ["notices"] });
    } catch (err: any) { toast.error(err?.message ?? "Failed"); }
  }

  return (
    <div>
      <PageHero title="Admin Dashboard" subtitle={`Signed in as ${userEmail}`}>
        <Button onClick={signOut} variant="outline" className="mt-4 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </PageHero>

      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="notices">
          <TabsList>
            <TabsTrigger value="notices">Notices ({noticesQ.data?.notices.length ?? 0})</TabsTrigger>
            <TabsTrigger value="apps">Applications ({appsQ.data?.applications.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="notices" className="mt-6 grid lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-bold text-lg mb-4">Publish a new notice</h2>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required maxLength={200} /></div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" defaultValue="notice">
                      <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notice">Notice</SelectItem>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label htmlFor="event_date">Event Date (optional)</Label><Input id="event_date" name="event_date" type="date" /></div>
                  <div><Label htmlFor="body">Body</Label><Textarea id="body" name="body" required rows={6} maxLength={20000} /></div>
                  <Button type="submit">Publish</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="font-bold text-lg">Published Notices</h2>
              {noticesQ.data?.notices.map((n) => (
                <Card key={n.id}>
                  <CardContent className="p-4 flex justify-between gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-2 items-center text-xs text-muted-foreground">
                        <Badge variant="outline" className="capitalize">{n.category}</Badge>
                        <span>{new Date(n.published_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="mt-1 font-semibold truncate">{n.title}</h3>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(n.id)}><Trash2 className="h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
              {(!noticesQ.data?.notices.length) && <p className="text-sm text-muted-foreground">No notices yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="apps" className="mt-6">
            <Card><CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left">
                  <tr>
                    <th className="p-3">Name</th><th className="p-3">Program</th><th className="p-3">Phone</th>
                    <th className="p-3">CNIC</th><th className="p-3">Submitted</th><th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appsQ.data?.applications.map((a) => (
                    <tr key={a.id} className="border-t border-border">
                      <td className="p-3 font-medium">{a.full_name}<div className="text-xs text-muted-foreground">s/o {a.father_name}</div></td>
                      <td className="p-3">{a.program}</td>
                      <td className="p-3">{a.phone}</td>
                      <td className="p-3 font-mono text-xs">{a.cnic}</td>
                      <td className="p-3 text-xs">{new Date(a.submitted_at).toLocaleDateString()}</td>
                      <td className="p-3"><Badge variant="outline" className="capitalize">{a.status}</Badge></td>
                    </tr>
                  ))}
                  {(!appsQ.data?.applications.length) && (
                    <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No applications yet.</td></tr>
                  )}
                </tbody>
              </table>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
