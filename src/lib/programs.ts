export type Program = {
  slug: string;
  name: string;
  duration: string;
  eligibility: string;
  seats: number;
  description: string;
  type: "DAE" | "KTS";
};

export const PROGRAMS: Program[] = [
  {
    slug: "dae-civil",
    name: "DAE Civil Technology",
    duration: "3 Years",
    eligibility: "Matric (Science) with min. 45%",
    seats: 50,
    type: "DAE",
    description: "Surveying, structural drawing, construction materials, quantity estimation, AutoCAD and site supervision skills.",
  },
  {
    slug: "dae-electrical",
    name: "DAE Electrical Technology",
    duration: "3 Years",
    eligibility: "Matric (Science) with min. 45%",
    seats: 50,
    type: "DAE",
    description: "Electrical machines, power distribution, wiring, electronics and industrial control systems.",
  },
  {
    slug: "dae-mechanical",
    name: "DAE Mechanical Technology",
    duration: "3 Years",
    eligibility: "Matric (Science) with min. 45%",
    seats: 50,
    type: "DAE",
    description: "Workshop practice, machine design, thermodynamics, CNC and manufacturing technologies.",
  },
  {
    slug: "dae-computer",
    name: "DAE Computer Information Technology",
    duration: "3 Years",
    eligibility: "Matric with min. 45%",
    seats: 40,
    type: "DAE",
    description: "Programming, web development, networking, database systems and IT support.",
  },
  {
    slug: "dae-auto-diesel",
    name: "DAE Auto & Diesel Technology",
    duration: "3 Years",
    eligibility: "Matric (Science) with min. 45%",
    seats: 40,
    type: "DAE",
    description: "Automobile engines, fuel systems, transmission, vehicle electrical and modern diagnostics.",
  },
  {
    slug: "kts-welder",
    name: "Welder (KTS Short Course)",
    duration: "6 Months",
    eligibility: "Middle / Matric",
    seats: 25,
    type: "KTS",
    description: "Arc, MIG/TIG welding, safety and metal fabrication practice.",
  },
  {
    slug: "kts-electrician",
    name: "Electrician (KTS Short Course)",
    duration: "6 Months",
    eligibility: "Middle / Matric",
    seats: 25,
    type: "KTS",
    description: "Domestic and industrial wiring, motor controls and installation safety.",
  },
  {
    slug: "kts-plumber",
    name: "Plumber (KTS Short Course)",
    duration: "6 Months",
    eligibility: "Middle / Matric",
    seats: 20,
    type: "KTS",
    description: "Pipe fitting, sanitary installation, fixtures and repair techniques.",
  },
];
