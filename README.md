# EliteJob Portal

A modern job portal and interview preparation platform built with vanilla HTML, CSS, and JavaScript.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Job search, latest listings, prep hub preview |
| Preparation | `preparation/index.html` | Interview resources with category filter |
| Companies | `companies/index.html` | Hiring processes for top tech firms |
| DSA Prep | `dsa/index.html` | 180+ curated problems with progress tracking |

## Project Structure

```
Antigravity/
├── index.html
├── css/
│   ├── style.css          # Variables, reset, typography, layout
│   ├── components.css     # Nav, buttons, cards, toast, tags
│   └── pages/
│       ├── home.css       # Hero, search, opportunities
│       ├── dsa.css        # DSA sheet
│       ├── companies.css  # Company cards, process steps
│       └── preparation.css
├── js/
│   ├── main.js            # Theme, toast, scroll, nav
│   ├── filter.js          # Search & category filtering
│   ├── dsa.js             # DSA render, progress, localStorage
│   ├── companies.js       # Company process rendering
│   └── data/
│       ├── jobs.js        # Job listings data
│       ├── companies.js   # Company hiring processes
│       └── dsa-problems.js # 180+ DSA problems
├── companies/index.html
├── preparation/index.html
├── dsa/index.html
└── assets/
    └── icons/
```

## Tech Stack

- **HTML5** — semantic, no inline styles
- **CSS3** — custom properties, light/dark theme
- **Vanilla JavaScript** — no frameworks, no build tools
- **Lucide Icons** — via CDN
- **Google Fonts** — Inter + Outfit

## Features

- Light / Dark theme with localStorage persistence
- Job search with keyword, location, and type filters
- Category filtering for preparation resources
- DSA progress tracker with localStorage save state
- Full hiring process breakdowns for Google, Amazon, Microsoft
- Responsive design (mobile-first)
