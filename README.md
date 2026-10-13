# Refactor the World

Website for **Refactor the World**, a nonprofit running free, online, monthly hackathons where students build technology for the public good.

Plain HTML, CSS and JavaScript with no build step, so it can be hosted for free on GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: code globe hero, first-event numbers, a month as a git log, award tracks, students/sponsors, FAQ |
| `hackathons.html` | Upcoming events, what to expect, event format, judging, past events |
| `sponsor.html` | Why sponsor, ways to support, sponsorship packages |
| `about.html` | Mission, the name, values, story, team |
| `404.html` | Not-found page (GitHub Pages serves it automatically) |

## Adding or updating a hackathon

Edit **`assets/js/events.js`**. It's the only file you need to touch. Each event has a `status` of `"upcoming"` or `"past"`:

- The soonest `"upcoming"` event is featured on the home page. All upcoming events are listed on the Hackathons page.
- `"past"` events appear newest first in the Past hackathons list.
- Set `url` to the Devpost link to show a **register** button (upcoming) or link the event name (past).

When an event ends, change its `status` to `"past"`, add a short `stats` line, and add the next month's event.

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
- **Team:** names, roles and bios on `about.html`.
- **Sponsorship packages:** pricing and specific benefits on `sponsor.html`.
- **Donations:** add a donation link once the nonprofit can accept them.

## Editing tips

- The home page has its own stylesheet (`assets/css/home.css`) and scripts: `globe.js` draws the hero globe from the land map in `land.js`, and `home.js` runs the headline animation and fills in the next event date from `events.js`.
- Colors and fonts are defined as variables at the top of `assets/css/style.css` (dark theme first, light theme under `[data-theme="light"]`).
- The header and footer are repeated in each page. If you change one, update it in all five HTML files.
