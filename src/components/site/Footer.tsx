import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-bold text-lg mb-3">GTVC Boys KTS</h3>
          <p className="text-sm text-primary-foreground/80 leading-relaxed">
            Government Technical & Vocational Centre (Boys), KTS Haripur — empowering students
            with industry-ready technical education since inception.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/courses" className="hover:text-gold">Courses</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/downloads" className="hover:text-gold">Downloads</Link></li>
            <li><Link to="/news" className="hover:text-gold">News & Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Affiliations</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>KP TEVTA</li>
            <li>KP Board of Technical Education (KPBTE)</li>
            <li>NAVTTC</li>
            <li>Govt. of Khyber Pakhtunkhwa</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> KTS Haripur, Khyber Pakhtunkhwa, Pakistan</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> +92 (000) 000-0000</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> info@gtvcktshripur.edu.pk</li>
            <li className="flex gap-2"><Facebook className="h-4 w-4 mt-0.5 shrink-0" /> facebook.com/gtvcboysktshripur</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-primary-foreground/70">
          <span>© {new Date().getFullYear()} GTVC Boys KTS Haripur. All rights reserved.</span>
          <Link to="/auth" className="hover:text-gold">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
