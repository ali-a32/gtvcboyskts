import { type ReactNode } from "react";

export function PageHero({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-4 text-lg md:text-xl text-primary-foreground/85">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
