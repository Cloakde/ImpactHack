# Refactor the World

Website for **Refactor the World**, a nonprofit running free, online, monthly hackathons where students build technology for the public good.

Plain HTML, CSS and JavaScript with no build step, so it can be hosted for free on GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: code globe hero, first-event numbers, a month as a git branch, award tracks, students and sponsors, FAQ |
| `hackathons.html` | What's next, the standing rules, judging weights, past hackathons |
| `sponsor.html` | Reach, ways to help, sponsorship packages, contact |
| `about.html` | Mission, the name, values, changelog, team (hidden until filled in) |
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
- **Team:** names, roles and bios on `about.html` (a commented-out section is ready to fill in).
- **Sponsorship packages:** pricing and specific benefits on `sponsor.html`.
- **Donations:** add a donation link once the nonprofit can accept them.

## Editing tips

- All pages share one stylesheet, `assets/css/site.css`. The color and font tokens are at the top.
- `assets/js/site.js` runs on every page: it fills in event details from `events.js`, plus the small animations.
- The home page also loads `globe.js`, which draws the hero globe from the land map in `land.js` (Natural Earth data).
- The header and footer are repeated in each page. If you change one, update it in all five HTML files.
