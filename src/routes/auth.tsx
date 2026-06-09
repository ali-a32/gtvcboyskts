import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — GTVC Boys KTS Haripur" },
      { name: "description", content: "Administrator sign-in for the college website." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Ask a database admin to grant the 'admin' role.");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHero title="Admin Portal" subtitle="Restricted access — for college administrators only." />
      <section className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardContent className="p-8">
            <div className="flex gap-2 mb-6">
              <Button variant={mode === "signin" ? "default" : "outline"} className="flex-1" onClick={() => setMode("signin")}>Sign In</Button>
              <Button variant={mode === "signup" ? "default" : "outline"} className="flex-1" onClick={() => setMode("signup")}>Sign Up</Button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                New admin accounts require the <code>admin</code> role to be assigned in the database before they can manage content.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
