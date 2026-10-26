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
 *   judging       Optional rubric for this hackathon, e.g.
 *                 [{ name: "Impact", weight: 25, description: "Does it help real people?" }]
 *                 Weights are percentages and should add up to 100. The next
 *                 hackathon's rubric appears on the Hackathons page; past ones
 *                 are summarized in the archive. Leave it out until it's decided.
 *   winners       Optional list of winners for past events, e.g.
 *                 [{ place: "1st", project: "Project name", url: "https://..." }]
 *
 * When a hackathon ends: set status to "past", fill in the numbers
 * (and winners if you like), then add the next one as "upcoming".
 */
window.RTW_EVENTS = [
  {
    name: "Global AI Builders Challenge",
    status: "upcoming",
    date: "2026-11-21",
    dateLabel: "Nov 21–28, 2026",
    theme: "Build something that uses AI to help people learn, create, or make an everyday task easier",
    description:
      "An online hackathon for students. Register on Devpost, build a working AI project during the week and submit by November 28.",
    format: "Online",
    url: "https://global-ai-builders-challenge.devpost.com/"
    // TODO: add this hackathon's judging rubric (see the field list above)
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
    // Rubric exactly as published on the ImpactHack 2026 Devpost page
    judging: [
      { name: "Impact", weight: 20, description: "Does the project address a meaningful problem or provide genuine value to its users?" },
      { name: "Technical Execution", weight: 20, description: "How effectively was the project designed and developed?" },
      { name: "Innovation & Creativity", weight: 15, description: "How original, creative, or interesting is the project?" },
      { name: "Functionality", weight: 15, description: "How well does the project actually work?" },
      { name: "Use of AI & Technology", weight: 15, description: "How effectively does the project use AI or other technology to expand its capabilities?" },
      { name: "Presentation & Demo", weight: 15, description: "How clearly and effectively does the team communicate its problem, solution, features, and impact?" }
    ],
    winners: []
  }
];
