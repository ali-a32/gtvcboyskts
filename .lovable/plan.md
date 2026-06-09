## GTVC Boys KTS Haripur — Website Plan

A clean, government-style technical college website in blue & white, with separate routes per section and a small backend for managing notices and receiving admission applications.

### Pages (separate routes for SEO + sharing)

1. **Home** (`/`) — hero, intro, quick-stats strip, featured programs, latest news preview, admissions CTA, footer
2. **About** (`/about`) — institution overview, vision/mission, principal's message, history
3. **Facilities** (`/facilities`) — workshops, labs, library, hostel, etc.
4. **Accreditation & Affiliation** (`/accreditation`) — affiliating bodies (KPBTE / TEVTA / NAVTTC etc.), recognitions
5. **Courses** (`/courses`) — DAE / KTS programs list with details (duration, eligibility, seats)
6. **Gallery** (`/gallery`) — image grid (campus, events, workshops)
7. **Downloads** (`/downloads`) — prospectus, forms, syllabus PDFs
8. **News & Events** (`/news`) — list of notices/events, individual detail view
9. **Contact** (`/contact`) — address, phone, email, map embed, contact form
10. **Admissions** (`/admissions`) — info + application form (linked from CTAs)
11. **Auth** (`/auth`) — admin sign-in
12. **Admin Dashboard** (`/_authenticated/admin`) — manage notices, view applications

Each page gets its own SEO `head()` (title, description, og tags).

### Design

- Blue & white government/academic palette (deep institutional blue primary, white surfaces, subtle gray accents, gold/amber for highlights)
- Clean sans-serif typography, generous spacing, professional not flashy
- Sticky header with logo + nav + "Apply Now" CTA
- Responsive (mobile hamburger nav)
- Footer with quick links, contact, affiliations, social
- Tailwind v4 design tokens defined in `src/styles.css`

### Backend (Lovable Cloud)

Tables:
- `notices` — id, title, slug, body, category (news/event/notice), published_at, is_published
- `applications` — id, full_name, father_name, cnic, dob, phone, email, address, program, prev_qualification, marks, submitted_at, status
- `user_roles` — user_id, role (admin) — separate table per security best practice
- `gallery_images` — id, title, image_url, category, created_at (optional, can use storage)
- `downloads` — id, title, file_url, category, created_at

Storage bucket for gallery images and downloadable PDFs.

Auth: email/password for admins only (no public signup).

RLS:
- `notices`, `gallery_images`, `downloads`: public read for published rows; admin write
- `applications`: public insert (form submissions); admin read/update
- `user_roles`: read via `has_role()` security-definer function

### Content

Will use realistic placeholder content modeled after a Pakistani technical college (GTVC/KTS-style: DAE Civil, Electrical, Mechanical, Computer, Auto & Diesel, plus KTS short courses). You can replace text/images later from the official Facebook page. No live scraping of Facebook — manual content swap.

### Build order

1. Enable Lovable Cloud + create database schema (tables, RLS, roles, storage)
2. Set up design tokens & shared layout (header, footer, mobile nav) in `__root.tsx`
3. Build public pages with placeholder content (Home → About → Courses → Facilities → Accreditation → Gallery → Downloads → News → Contact)
4. Build Admissions page + application form (public insert via server fn)
5. Build `/auth` sign-in page
6. Build `_authenticated/admin` dashboard: notices CRUD, applications viewer, gallery & downloads management
7. Wire News & Events page + detail view to real `notices` table
8. SEO meta per route + hero image generation

### Technical notes

- TanStack Start file-based routing under `src/routes/`
- All DB access via `createServerFn` (public reads use `supabaseAdmin` import inside handler; admin writes use `requireSupabaseAuth` + `has_role` check)
- Admin gate uses integration-managed `_authenticated/route.tsx`
- Form validation with Zod
- Images generated for hero/campus placeholders; replaceable later
