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
 *   rubricUrl     Optional link to the full rubric (e.g. the Devpost Resources page).
 *   rubricUnit    "points" to show weights as points instead of percentages.
 *   judging       Optional rubric for this hackathon, e.g.
 *                 [{ name: "Impact", weight: 25, description: "Does it help real people?" }]
 *                 Weights are percentages and should add up to 100. The next
 *                 hackathon's rubric appears on the Hackathons page; past ones
 *                 are summarized in the archive. Leave it out until it's decided.
 *   judges        Optional list of judges, e.g.
 *                 [{ name: "Full Name", role: "Title, Organization", url: "https://..." }]
 *                 They are thanked on the Credits page, listed on the Hackathons
 *                 page for the next hackathon, and named in the archive. url is optional.
 *   sponsors      Optional list of sponsors and partners, e.g.
 *                 [{ name: "Company", url: "https://...", logo: "assets/img/sponsors/company.png",
 *                    contribution: "API credits for every team" }]
 *                 Only url, logo and contribution are optional. Sponsor sections stay
 *                 hidden until at least one hackathon lists a sponsor.
 *   winners       Optional list of winners for past events, e.g.
 *                 [{ place: "1st", project: "Project name", url: "https://..." }]
 *
 * When a hackathon ends: set status to "past", fill in the numbers
 * (and winners if you like), then add the next one as "upcoming".
 */
window.RTW_EVENTS = [
  {
    name: "Global AI Builder’s Challenge",
    status: "upcoming",
    date: "2026-11-21",
    dateLabel: "Nov 21–28, 2026",
    theme: "Build something that uses AI to help people learn, create, or make an everyday task easier",
    description:
      "Free and online for students aged 13 and up. Work solo or in a team of up to six to build a new project or meaningfully improve an existing one. Submissions close November 28 at 3:00 p.m. PST, and winners are announced December 5.",
    format: "Online",
    url: "https://global-ai-builders-challenge.devpost.com/",
    rubricUrl: "https://global-ai-builders-challenge.devpost.com/resources",
    rubricUnit: "points",
    prizes: 34,
    // Rubric sections and points as published on the Devpost page (out of 100)
    judging: [
      { name: "Problem Value & Practicality", weight: 20, description: "Supported user need, project fit, an advantage over the current approach, and realistic use by the intended users." },
      { name: "AI Integration & Development", weight: 30, description: "Justified AI choice, effective implementation, AI assessment with results and limits, and checked AI-assisted development." },
      { name: "Functionality & Reliability", weight: 30, description: "Complete main task, correct results across cases, and safe failure handling." },
      { name: "Design Quality & User Experience", weight: 20, description: "Clear emphasis, consistent design, reduced user effort, and understandable information." }
    ],
    // Judges and titles as listed on the Devpost page
    judges: [
      { name: "Ahmad Abuizzah", role: "Founder & Hackathon Organizer, Refactor The World" },
      { name: "Ismail Bashandy", role: "Mechatronics Lecturing Assistant" },
      { name: "Shayan Hoque", role: "AI App Developer" },
      { name: "Adam Ali", role: "Co-founder, MeltingPot" },
      { name: "Rayyan Hashmi", role: "Co-founder, MeltingPot" },
      { name: "Takoua El Bejaoui", role: "Mechanical & Aerospace Engineer | Research & Design Experience at Stanford University | Computer Science & Engineering Educator" },
      { name: "Muhammad Abdullah Nazeer", role: "Software Engineer | AI & Machine Learning Instructor at iCodeGuru | LLM Integration & Web Application Development" },
      { name: "Spencer Morgan", role: "Co-Founder, Meltingpot | Game Developer & Entrepreneur" }
    ],
    // Sponsors and what they gave, as confirmed on the Devpost page
    sponsors: [
      {
        name: "Adaption Labs",
        url: "https://adaptionlabs.ai/",
        logo: "assets/img/sponsors/adaption-labs.png",
        contribution: "$500 in Adaption credits and three months of Adaption Plus for eligible participants, plus $1,000 more in credits for each member of the top three teams."
      },
      {
        name: "Momen",
        url: "https://momen.app/",
        logo: "assets/img/sponsors/momen.png",
        contribution: "$100 in Momen credits for every eligible participant, and $2,000 in credits for each member of the Best Use of Momen team."
      },
      {
        name: "Prune",
        url: "https://withprune.com/",
        logo: "assets/img/sponsors/prune.png",
        contribution: "A Prune Pro account for every team during the event, and 12, 6 and 3 months of Prune Pro for the top three Best Use of Prune projects."
      },
      {
        name: "Dealkata",
        url: "https://dealkata.mattiac926.workers.dev/",
        logo: "assets/img/sponsors/dealkata.png",
        contribution: "Six, three and one month of Dealkata Pro for each member of the first-, second- and third-place teams."
      },
      {
        name: "Art of Problem Solving",
        url: "https://artofproblemsolving.com/",
        logo: "assets/img/sponsors/art-of-problem-solving.png",
        contribution: "Four $25 AoPS product coupons, awarded as prizes."
      }
    ]
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
    judges: [
      { name: "Ahmad Abuizzah" },
      { name: "Rayyan Hashmi" },
      { name: "Spencer Morgan" },
      { name: "Adam Ali" },
      { name: "Ismail Bashandy" },
      { name: "Shayan Hoque" }
    ],
    sponsors: [],
    winners: []
  }
];
