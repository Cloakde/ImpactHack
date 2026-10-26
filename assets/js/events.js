/*
 * Hackathon data. This is the ONLY file you need to edit to add or update events.
 * Everything else on the site (build numbers, the archive, running totals)
 * is worked out from this list.
 *
 * Each event:
 *   name          Event name shown on the site.
 *   status        "upcoming" or "past".
 *   date          ISO date (YYYY-MM-DD) used for sorting and grouping by year.
 *                 Use null if it isn't scheduled yet.
 *   dateLabel     How the date is displayed, e.g. "Nov 14–16, 2026".
 *   theme         Short theme or tagline.
 *   description   One or two sentences.
 *   format        e.g. "Online".
 *   url           Devpost (or other) link. Use null to hide the link.
 *   participants  Number of participants (past events). Optional.
 *   projects      Number of submitted projects (past events). Optional.
 *   prizes        Number of prizes awarded (past events). Optional.
 *   winners       Optional list of winners for past events, e.g.
 *                 [{ place: "1st", project: "Project name", url: "https://..." }]
 *
 * When a hackathon ends: set status to "past", fill in the numbers
 * (and winners if you like), then add the next one as "upcoming".
 */
window.RTW_EVENTS = [
  {
    name: "Our next hackathon",
    status: "upcoming",
    date: null,
    dateLabel: "Date announced soon",
    theme: "Theme to be revealed",
    description:
      "The theme, dates and prizes go up on Devpost when the hackathon is announced.",
    format: "Online",
    url: null
  },
  {
    name: "ImpactHack 2026",
    status: "past",
    date: "2026-10-15",
    dateLabel: "Oct 2026",
    theme: "Build technology that creates meaningful impact",
    description:
      "Students built websites, apps, AI tools and hardware aimed at real problems in their schools and communities.",
    format: "Online",
    url: null,
    participants: 450,
    projects: null,
    prizes: 23,
    winners: []
  }
];
