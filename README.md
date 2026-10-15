# Refactor the World

Website for **Refactor the World**, a nonprofit running free, online, monthly hackathons where students build technology for the public good.

Plain HTML, CSS and JavaScript with no build step, so it can be hosted for free on GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: code globe hero, a month as a git branch, award tracks, students and sponsors, FAQ. Mentions no specific event, so it never goes stale |
| `hackathons.html` | What's next, the standing rules, judging weights, link to the archive |
| `archive.html` | Every past hackathon grouped by year, with running totals and optional winners |
| `sponsor.html` | Reach, ways to help, sponsorship packages, contact |
| `about.html` | Mission, the name, values, team (hidden until filled in) |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |

## Adding or updating a hackathon

Edit **`assets/js/events.js`**. It's the only file you need to touch. The field list is at the top of the file.

- The soonest `"upcoming"` event is featured on the Hackathons page, and its date shows in the home page status bar.
- `"past"` events fill the Archive page, grouped by year, newest first.
- Build numbers (`build #001`, `#002`, ...) and release tags (`v2026.10`) are worked out from the dates.
- Running totals (hackathons run, participants, prizes) are added up from every past event's `participants` and `prizes`, and appear on the Archive, Hackathons and Sponsor pages.

When a hackathon ends, change its `status` to `"past"`, fill in `participants`, `prizes` and optionally `projects` and `winners`, and add the next month's event as `"upcoming"`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Merge into `main`.
2. In the repo on GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.

The site will be live at `https://cloakde.github.io/impacthack/`. A custom domain can be added later in the same settings page.

## Placeholders to fill in

Search the code for `TODO` to find them all.

- **Contact email:** `hello@example.org` in the footer of every page and on `sponsor.html`.
- **Social links:** footer of every page (Discord, Instagram, LinkedIn, ...).
- **Next hackathon:** date, theme and Devpost link in `assets/js/events.js`.
- **Team:** names, roles and bios on `about.html` (a commented-out section is ready to fill in).
- **Sponsorship packages:** pricing and specific benefits on `sponsor.html`.
- **Donations:** add a donation link once the nonprofit can accept them.

## Editing tips

- All pages share one stylesheet, `assets/css/site.css`. The color and font tokens are at the top.
- `assets/js/site.js` runs on every page: it fills in event details from `events.js`, plus the small animations.
- The home page also loads `globe.js`, which draws the hero globe from the land map in `land.js` (Natural Earth data).
- The header and footer are repeated in each page. If you change one, update it in all six HTML files.
