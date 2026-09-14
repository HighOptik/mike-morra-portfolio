export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const site = {
  name: "Mike Morra",
  role: "Lead Unity Developer",
  location: "Toronto, ON",
  email: "mikeemorra@gmail.com",
  phone: "647-984-9824",
  steam: "https://store.steampowered.com/app/4797000/UberLoop/",
  itch: "https://mikemo.itch.io/uberloop",
  summary:
    "Gameplay systems, production C#, and player-facing features — from prototype through ship. Currently releasing UberLoop on Steam.",
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  blurb: string;
  tags: string[];
  href?: string;
  hrefLabel?: string;
  itch?: string;
  embedUrl?: string;
  featured?: boolean;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "uberloop",
    title: "UberLoop",
    year: "2026",
    role: "Design & Unity",
    blurb:
      "Unity 3D top-down survivor / bullet-heaven. Horde combat, character unlocks, stacking skills, elemental builds, timed bosses. Steam page is live; currently Coming soon. Play the in-progress HTML5 build below.",
    tags: ["Unity", "C#", "Steam", "itch.io"],
    href: "https://store.steampowered.com/app/4797000/UberLoop/",
    hrefLabel: "Steam",
    itch: "https://mikemo.itch.io/uberloop",
    embedUrl: "https://itch.io/embed-upload/18697837?color=16102c",
    featured: true,
    comingSoon: true,
  },
];

export const experience = [
  {
    studio: "NEX Level Gaming",
    title: "Lead Unity Developer",
    dates: "Aug 2023 — Feb 2026",
    points: [
      "Led implementation of gameplay systems and player-facing features from concept through production.",
      "Set coding standards and workflows; mentored juniors and supported hiring.",
    ],
  },
  {
    studio: "BottleCap Media",
    title: "Unity Developer & Technology Specialist",
    dates: "Aug 2019 — May 2023",
    points: [
      "Shipped gameplay, UI, and technical systems; built prototypes for new concepts.",
      "Implemented multiplayer features and worked across art and design.",
    ],
  },
  {
    studio: "TriOS College",
    title: "Video Game Instructor",
    dates: "Feb 2023 — Mar 2024",
    points: [
      "Taught Unity and production practices; coached students through iteration and ship-ready habits.",
    ],
  },
];
