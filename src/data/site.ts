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
    "Unity lead in Toronto. I build gameplay and ship features. UberLoop is on Steam.",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/soopertype/" },
    { label: "Facebook", href: "https://www.facebook.com/SooperType/" },
    { label: "Bluesky", href: "https://bsky.app/profile/soopertype.bsky.social" },
    { label: "X", href: "https://x.com/UberL00p" },
    { label: "TikTok", href: "https://www.tiktok.com/@soopertype" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/michael-morra-a370a4238/" },
  ],
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
      "Top-down survivor I'm making in Unity. Hordes, unlocks, stacked skills, timed bosses. Steam page is up. Coming soon.",
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
      "Led gameplay and feature work in Unity.",
      "Set coding standards. Mentored juniors and helped with hiring.",
    ],
  },
  {
    studio: "BottleCap Media",
    title: "Unity Developer & Technology Specialist",
    dates: "Aug 2019 — May 2023",
    points: [
      "Shipped gameplay, UI, and tech on production projects.",
      "Did multiplayer work. Prototyped new ideas with art and design.",
    ],
  },
  {
    studio: "TriOS College",
    title: "Video Game Instructor",
    dates: "Feb 2023 — Mar 2024",
    points: [
      "Taught Unity. Helped students finish their games.",
    ],
  },
];
