export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const site = {
  name: "Mike Morra",
  role: "Lead Unity Developer",
  location: "Toronto, ON",
  email: "mikeemorra@gmail.com",
  phone: "647-984-9824",
  mailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("mikeemorra@gmail.com")}`,
  phoneHref: "tel:+16479849824",
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
  about: string[];
  features: string[];
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
    about: [
      "Survive the clock, drop the bosses—that's the run. Enemy swarms spike throughout the match, boss fights hit at set moments, and the music ramps up when things get ugly.",
      "UberLoop is a 3D top-down survivor with bullet-heaven combat—move, aim, and outlast escalating hordes while your build snowballs out of control.",
      "Pick a character, level up with stat choices, crack open loot chests for new skills, and stack burn, poison, shock, cryo, auras, crit chains, and splash until nothing on the map survives your loop.",
    ],
    features: [
      "Over 5 playable characters (so far).",
      "Stat upgrades on level-up plus stackable combat skills you find during the run.",
      "Elemental paths: burn, poison, shock, and cryo.",
      "Boss fights at set times, ending in a final boss.",
      "Sudden enemy swarms and elites that can wreck a run.",
      "Loot chests, XP pickups, coins, and a magnetic pickup upgrade.",
      "Achievements tracked per character and across your career.",
      "Remappable keyboard controls. Touch on mobile. Gamepad-friendly UI.",
    ],
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
