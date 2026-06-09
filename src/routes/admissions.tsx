import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROGRAMS } from "@/lib/programs";
import { submitApplication } from "@/lib/notices.functions";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — GTVC Boys KTS Haripur" },
      { name: "description", content: "Apply online for DAE and KTS programs at GTVC Boys KTS Haripur." },
      { property: "og:title", content: "Admissions — GTVC Boys KTS Haripur" },
      { property: "og:description", content: "Online admission application form for DAE and KTS programs." },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const submit = useServerFn(submitApplication);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    setSubmitting(true);
    try {
      await submit({ data: payload as any });
      setDone(true);
      toast.success("Application submitted! We'll contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err?.message ?? "Could not submit. Please check the form.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHero title="Admissions" subtitle="Online application for the current intake. Quick, simple and free." />

      <section className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {done ? (
            <Card>
              <CardContent className="p-10 text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
                <h2 className="mt-4 text-2xl font-bold">Application received</h2>
                <p className="mt-2 text-muted-foreground">Thank you! The admissions office will contact you on the phone number provided.</p>
                <Button className="mt-6" onClick={() => setDone(false)}>Submit another</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-1">Application Form</h2>
                <p className="text-sm text-muted-foreground mb-6">Fields marked * are required.</p>
                <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
                  <Field label="Full Name *" name="full_name" required minLength={2} maxLength={100} />
                  <Field label="Father's Name *" name="father_name" required minLength={2} maxLength={100} />
                  <Field label="CNIC / B-Form *" name="cnic" required pattern="[0-9-]{13,15}" placeholder="xxxxx-xxxxxxx-x" />
                  <Field label="Date of Birth" name="dob" type="date" />
                  <Field label="Phone *" name="phone" required type="tel" />
                  <Field label="Email" name="email" type="email" />
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" rows={2} maxLength={500} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="program">Program *</Label>
                    <Select name="program" required>
                      <SelectTrigger id="program"><SelectValue placeholder="Select a program" /></SelectTrigger>
                      <SelectContent>
                        {PROGRAMS.map((p) => <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Field label="Previous Qualification" name="prev_qualification" placeholder="e.g. Matric (Science)" />
                  <Field label="Marks / Grade" name="marks" placeholder="e.g. 720/1100" />
                  <div className="md:col-span-2 mt-2">
                    <Button type="submit" disabled={submitting} size="lg" className="w-full md:w-auto">
                      {submitting ? "Submitting…" : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          <Card><CardContent className="p-6">
            <h3 className="font-bold">Eligibility Snapshot</h3>
            <ul className="mt-3 text-sm text-muted-foreground space-y-2">
              <li><strong className="text-foreground">DAE:</strong> Matric (Science) with 45% or above</li>
              <li><strong className="text-foreground">KTS:</strong> Middle / Matric</li>
              <li>Original documents at the time of interview</li>
            </ul>
          </CardContent></Card>
          <Card><CardContent className="p-6">
            <h3 className="font-bold">Documents Required</h3>
            <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Matric / SSC certificate (attested copy)</li>
              <li>Domicile certificate</li>
              <li>CNIC / B-Form copy</li>
              <li>Two passport-size photographs</li>
              <li>Character certificate</li>
            </ul>
          </CardContent></Card>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}
