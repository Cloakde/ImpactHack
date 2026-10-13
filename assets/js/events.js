/*
 * Hackathon data — the ONLY file you need to edit to add or update events.
 *
 * Each event:
 *   name        Event name shown on the site.
 *   status      "upcoming" or "past".
 *   date        ISO date (YYYY-MM-DD) used for sorting. Use null if not set yet.
 *   dateLabel   How the date is displayed, e.g. "Nov 14–16, 2026".
 *   theme       Short theme or tagline.
 *   description One or two sentences.
 *   format      e.g. "Online".
 *   url         Devpost (or other) link. Use null to hide the button.
 *   stats       Optional short highlight for past events, e.g. "450 participants".
 *
 * The first "upcoming" event (soonest date) is featured on the home page.
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
    url: null,
    stats: null
  },
  {
    name: "ImpactHack 2026",
    status: "past",
    date: "2026-10-15",
    dateLabel: "Oct 2026",
    theme: "Build technology that creates meaningful impact",
    description:
      "Our first event. Students built websites, apps, AI tools and hardware aimed at real problems in their schools and communities.",
    format: "Online",
    url: null,
    stats: "450 participants · 23 prizes"
  }
];
