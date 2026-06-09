import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/facilities", label: "Facilities" },
  { to: "/accreditation", label: "Accreditation" },
  { to: "/gallery", label: "Gallery" },
  { to: "/downloads", label: "Downloads" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top utility bar */}
      <div className="hidden md:block bg-primary text-primary-foreground text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center h-9">
          <span>Government Technical & Vocational Centre (Boys) KTS, Haripur</span>
          <div className="flex gap-4">
            <a href="tel:+92000000000" className="hover:text-gold">+92 (000) 000-0000</a>
            <a href="mailto:info@gtvcktshripur.edu.pk" className="hover:text-gold">info@gtvcktshripur.edu.pk</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt="GTVC Logo" width={40} height={40} className="h-10 w-10" />
            <div className="leading-tight">
              <div className="text-sm font-bold text-primary">GTVC Boys KTS</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Haripur, Pakistan</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-accent transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm font-medium text-primary bg-accent rounded-md" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/admissions">Apply Now</Link>
            </Button>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-border py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md"
                activeProps={{ className: "px-3 py-2 text-sm font-medium text-primary bg-accent rounded-md" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admissions"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2 text-sm font-semibold bg-gold text-gold-foreground rounded-md text-center"
            >
              Apply Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
